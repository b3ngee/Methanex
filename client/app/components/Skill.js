import React from 'react';
import { skill } from '../styles/skill.scss';
import Table from './Table';
import Button from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('user_id'),
            skillTypeData: {},
            skillCategoryData: {},
            numSkill: 0,
            rows: [],
            num: 0
        };
        this.getSkills = this.getSkills.bind(this);
    }

    componentDidMount() {
        this.getSkillCategories();
//        this.getSkillTypes();
//        this.getSkills();
    }

    getSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills', {headers: {Pragma: 'no-cache'}}).then(response => {
            this.setState({ numSkill: response.data.length });
            this.setState({ skills: response.data });

            const tableData = [];
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
        let columns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        const data = [{'Value': localStorage.user_id}];
        return(
            <div className={ skill }>
                <h4>Skills</h4>
                <Table text="List of Skills" columns={columns} rows={this.state.rows}/>
                <Link to = {{pathname: '/addSkill', state: {data}}}>
                    <Button
                        type="submit"
                        label="Add Skill"
                    />
                </Link>
                <Link to = "/">
                     <Button
                         type="submit"
                         label="Edit Skill"
                     />
                 </Link>
                <Link to = "/">
                    <Button
                        type="submit"
                        label="Delete Skill"
                    />
                </Link>
            </div>
        );
    }
}

export default Skill;
