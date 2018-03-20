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
            skillTypeData: {},
            skillCategoryData: {},
            rows: [],
            rowNum: 0,
            userSkillIds: []
        };
        this.getSkills = this.getSkills.bind(this);
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    getSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.state.userId).then(response => {
            this.setState({ numSkill: response.data.length });
            this.setState({ skills: response.data });
            const tableData = [];
            const tableDataForEdit = [];

            for (let i = 0; i < this.state.numSkill; i++) {
                for(let j = 0; j < this.state.skillTypeData.length; j++) {
                    if (this.state.skillTypeData[j].id === this.state.skills[i].skillTypeId) {
                        for(let k = 0; k < this.state.skillCategoryData.length; k++) {
                            if (this.state.skillCategoryData[k].id === this.state.skillTypeData[j].skillCategoryId) {
                                this.state.userSkillIds.push(this.state.skills[i].id);
                                tableData.push({
                                    'ID': this.state.rowNum + 1,
                                    'Skill Category': this.state.skillCategoryData[k].name,
                                    'Skill Name': this.state.skillTypeData[j].name,
                                    'Skill Competency': this.state.skills[i].competency
                                });
                                this.state.rowNum++;
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
        const { numSkill } = this.state;
        let columns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        const data = [{'Value': localStorage.user_id}];
        const skillsData = this.state.rows;
        const skillIdsData = this.state.userSkillIds;
        if (numSkill === 0) {
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
                <Link to = {{pathname: '/skill/edit', state: {skillsData, skillIdsData}}}>
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
