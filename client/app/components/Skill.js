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
            userSkillIds: []
        };
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    getSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.state.userId, {headers: {Pragma: 'no-cache'}}).then(response => {
            this.setState({ numSkill: response.data.length });
            this.setState({ skills: response.data });
            const tableData = [];

            for (let i = 0; i < this.state.numSkill; i++) {
                for(let j = 0; j < this.state.skillTypeData.length; j++) {
                    if (this.state.skillTypeData[j].id === this.state.skills[i].skillTypeId) {
                        for(let k = 0; k < this.state.skillCategoryData.length; k++) {
                            if (this.state.skillCategoryData[k].id === this.state.skillTypeData[j].skillCategoryId) {
                                this.state.userSkillIds.push(this.state.skills[i].id);
                                tableData.push({
                                    'Skill Category': this.state.skillCategoryData[k].name,
                                    'Skill Name': this.state.skillTypeData[j].name,
                                    'Skill Competency': this.state.skills[i].competency
                                });
                            }
                        }
                    }
                }
            }
            this.setState({ rows: tableData});
        }).catch( () => {
        });
    }

    getSkillCategories() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories', {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ skillCategoryData: response.data });
            this.getSkillTypes();
        });
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types', {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ skillTypeData: response.data });
            this.getSkills();
        });
    }

    render() {
        let columns = ['Skill Category', 'Skill Name', 'Skill Competency'];
        const data = [{'Value': localStorage.user_id}];
        const skillsData = this.state.rows;
        const skillIdsData = this.state.userSkillIds;

        return(
            <div className={ skill }>
                <h1>My Skills</h1>
                <Table text="List of Skills" columns={columns} rows={this.state.rows}/>
                <div>
                    <Link to = {{pathname: '/skill/add', state: {data}}}>
                        <Button
                            type="submit"
                            label="Add Skill"
                        />
                    </Link>
                    <Link to = {{pathname: '/skill/edit', state: {skillsData, skillIdsData, data}}}>
                        <Button
                            type="submit"
                            label="Edit Skills"
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Skill;
