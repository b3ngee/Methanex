import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { skill } from '../styles/skill.scss';
// import Button from './Button';
import Table from './Table';
import Dropdown from './Dropdown';
import { COMPETENCY } from '../constants/constants.js';

class EditExistingSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('user_id'),
            skillTypeData: {}, // TODO?
            skillCategoryData: {},  // TODO ?
            numSkill: 0, // TODO?
            rows: [], // TODO?
            num: 0, // TODO?
            editingRows: [], // REQUIRED
            editedCompetencies: [], // REQUIRED
            checks: [], // array of checks status for every user skill
            numChecked: 0, // number of checks for deleting skills
            errors: {}, // TODO?
            userCompetencies: [], // TODO?
            userSkillIds: [], // TODO?
            userSkillNum: 0 // required
        };
        this.getSkills = this.getSkills.bind(this);
        this.handleMultipleSelects = this.handleMultipleSelects.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.state.num = 0;
        this.state.userCompetencies = [];
        this.state.editedCompetencies = [];
        this.getSkillCategories();
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
                                    tableDataForEdit.push({
                                        'ID': this.state.num + 1,
                                        'Skill Category': this.state.skillCategoryData[k].name,
                                        'Skill Name': this.state.skillTypeData[j].name,
                                        'Competency': this.state.skills[i].competency,
                                        'New Competency': <Dropdown
                                                                label=""
                                                                name="sC"
                                                                data={COMPETENCY}
                                                                onSelect={this.handleMultipleSelects}
                                                                error={this.state.errors.sC}
                                                             />,
                                        'Remove Skill': <input type="checkbox" onClick={this.handleDelete} />
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

    handleMultipleSelects() {
        const competencies = [];
        const updatedCompetencies = [];
        for (let i = 0; i < document.getElementsByTagName('select').length; i++) {
            const skillCompetency = document.getElementsByTagName('select')[i].value;
            competencies.push(skillCompetency);
        }
        for (let i = 0; i < competencies.length; i++) {
            if (competencies[i] === 'Select ... ') {
                updatedCompetencies.push(this.state.userCompetencies[i]);
            } else {
                updatedCompetencies.push(competencies[i]);
            }
        }
        this.state.editedCompetencies = updatedCompetencies;
    }

    handleDelete() {
        let tempNumChecked = 0;
        const tempChecks = []; // temp: array of checks status for every user skill --> checks
        for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
            if (document.getElementsByTagName('input')[i].checked) {
                console.log('checkbox #:' + i + 'is check');
                tempNumChecked++;
                tempChecks.push(1);
            } else {
                console.log('checkbox #:' + i + 'is uncheck');
                tempChecks.push(0);
            }
        }
        console.log('So far array tempChecks: ' + tempChecks);
        this.state.checks = tempChecks;
        console.log('So far array checks: ' + this.state.checks);
        console.log('So far there are ' + tempNumChecked + ' checks');
        this.state.numChecked = tempNumChecked;
        console.log('Overall So far there are ' + this.state.numChecked + ' checks');
        console.log('Rhoda leaves handleDelete');
    }

    handleEditing() {
        let differenceCount = 0;
        this.setState({
            editMode: 0
        });
        for (let i = 0; i < this.state.userCompetencies.length; i++) {
            if ( this.state.userCompetencies[i] - this.state.editedCompetencies[i] ) {
                differenceCount++;
                const id = this.state.userSkillIds[i];
                const c = this.state.editedCompetencies[i];
                axios.put('https://methanex-portfolio-management.herokuapp.com/user-skills/' + id, {
                    competency: c
                }).then((response) => {
                    console.log(response.status);
                    console.log('PUT!');
                });
            }
        }

        if (this.state.numChecked !== 0) {
            for (let i = 0; i < this.state.checks.length; i++ ) {
                if ( this.state.checks[i] === 1) {
                    const id = this.state.userSkillIds[i];
                    axios.delete('https://methanex-portfolio-management.herokuapp.com/user-skills/' + id, {
                    }).then((response) => {
                        console.log(response.status);
                        console.log('--> DELETED! because check is ' + this.state.checks[i]);
                    });
                }
            }
        }

        if ( differenceCount === 0 && this.state.numChecked === 0 ||
            this.state.editedCompetencies.length === 0 && this.state.numChecked === 0
        ) {
            alert('no changes were made');
        } else {
            this.componentDidMount();
            console.log(differenceCount);
            console.log(this.state.userCompetencies);
            console.log(this.state.editedCompetencies);
            alert('successful');
        }
        this.state.userSkillNum = 0;
        alert('all changes made!!!!');
    }

    render() {
        const { userSkillNum } = this.state;
        console.log('rendering: currently user has ' + userSkillNum + ' skills');

        let editingColumns = ['ID', 'Skill Category', 'Skill Name', 'Competency', 'New Competency', 'Remove Skill'];
        const data = [{'Value': localStorage.user_id}];
        if (userSkillNum === 0) {
            return(
               <div className={ skill }>
                    <h4><i>you currently have no skill...</i></h4>
                    <Link to = {{pathname: '/skill/add', state: {data}}}>
                        <button>Add Skill</button>
                    </Link>
                </div>
            );
        }
        return(
            <div className={ skill }>
                <h1>Editing Skills</h1>
                <Table text="List of Skills" columns={editingColumns} rows={this.state.editingRows}/>
                <Link to = {{pathname: '/', state: {data}}}>
                    <button onClick={this.handleEditing}>save changes</button>
                </Link>
            </div>
        );
    }
}

export default EditExistingSkill;

EditExistingSkill.propTypes = {
    data: PropTypes.any,
    location: PropTypes.any,
    history: PropTypes.any,
    match: PropTypes.any,
};
