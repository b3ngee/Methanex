import React, { Component } from 'react';
import { skill } from '../styles/skill.scss';
import Table from './Table';
 import Button from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('user_id'),
            userSkillNum: 0, // keep track of the number of user's skills
            skillTypeData: {},  // TODO ?
            skillCategoryData: {}, // TODO?
            numSkill: 0,  // TODO?
            rows: [], // TODO?
            num: 0, // TODO?
            errors: {}, // TODO?
            userCompetencies: [], // TODO?
            userSkillIds: [] // TODO?
        };
        this.getSkills = this.getSkills.bind(this);
    }

    componentDidMount() {
        this.state.num = 0;
        this.state.userCompetencies = [];
        this.getSkillCategories();
    }

    getSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills').then(response => {
            this.setState({ numSkill: response.data.length });
            this.setState({ skills: response.data });

            const tableData = [];
            const tableDataForEdit = [];
            // loop through  UserSkills
            for (let i = 0; i < this.state.numSkill; i++) {
                // we are only interested in rows that has the current user's id
                if (this.state.skills[i].userId.toString() === this.state.userId) {
                    // loop through SkillTypes
                    for(let j = 0; j < this.state.skillTypeData.length; j++) {
                        // we are trying to find the row that has the same skillTypeId
                        if (this.state.skillTypeData[j].id === this.state.skills[i].skillTypeId) {
                            // loop through SkillCategories
                            for(let k = 0; k < this.state.skillCategoryData.length; k++) {
                                // we are trying to find the row that has the same skillCategoryId
                                if (this.state.skillCategoryData[k].id === this.state.skillTypeData[j].skillCategoryId) {
                                    this.state.userSkillNum++;
                                    this.state.userCompetencies.push(this.state.skills[i].competency);
                                    this.state.userSkillIds.push(this.state.skills[i].id);
                                    tableData.push({
                                        'ID': this.state.num + 1,
                                        'Skill Category': this.state.skillCategoryData[k].name,
                                        'Skill Name': this.state.skillTypeData[j].name,
                                        'Skill Competency': this.state.skills[i].competency
                                    });
                                    this.state.num++;
                                }
                            }
                        }
                    }
                }
            }
            this.setState({ rows: tableData});
            this.setState({ editingRows: tableDataForEdit});
        }).catch( () => {
        });
    }

    getSkillCategories() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories').then( (response) => {
            this.setState({ skillCategoryData: response.data });
            this.getSkillTypes();
        });
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types').then( (response) => {
            this.setState({ skillTypeData: response.data });
            this.getSkills();
        });
    }

    render() {
        const { userSkillNum } = this.state;
        let columns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        const data = [{'Value': localStorage.user_id}];

        if (userSkillNum === 0) {
            return(
               <div className={ skill }>
                    <h4><i>you currently have no skill...</i></h4>
                    <Link to = {{pathname: '/skill/add', state: {data}}}>
                        <Button
                            type="submit"
                            label="Add Skill"
                        />
                    </Link>
                </div>
            );
        }

        return(
            <div className={ skill }>
                <h1>My Skills</h1>
                <Table text="List of Skills" columns={columns} rows={this.state.rows}/>
                <Link to = {{pathname: '/skill/add', state: {data}}}>
                    <Button
                        type="submit"
                        label="Add Skill"
                    />
                </Link>
                <br />
                <Link to = {{pathname: '/skill/edit', state: {data}}}>
                    <Button
                        type="submit"
                        label="Edit Skills"
                    />
                </Link>
            </div>
        );
    }
}

export default Skill;
