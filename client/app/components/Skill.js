import React, { Component, PropTypes } from 'react';
// import React, { Component } from 'react';
import { skill } from '../styles/skill.scss';
import Table from './Table';
// import Button from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Dropdown from './Dropdown';
// import { COMPETENCY } from '../constants/constants.js';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
//            testingId: this.props.location.state.data[1].Value, // TODO testing
            userId: localStorage.getItem('user_id'),
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
        let columns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        const data = [{'Value': localStorage.user_id}];

        return(
            <div className={ skill }>
                <h1>My Skills</h1>
                <Table text="List of Skills" columns={columns} rows={this.state.rows}/>
                <Link to = {{pathname: '/skill/add', state: {data}}}>
                    <button>Add Skill</button>
                </Link>
                <br />
                <Link to = {{pathname: '/skill/edit', state: {data}}}>
                    <button>Edit Skill</button>
                </Link>
                <br />
            </div>
        );
    }
}
export default Skill;

Skill.propTypes = {
    data: PropTypes.any,
    location: PropTypes.any,
//    history: PropTypes.any, // TODO ?
//    match: PropTypes.any, // TODO ?
};
