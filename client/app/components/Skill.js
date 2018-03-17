import React from 'react';
import { skill } from '../styles/skill.scss';
import Table from './Table';
import Button from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dropdown from './Dropdown';
let competencyData = [
    '1',
    '2',
    '3',
    '4',
    '5'];

class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('user_id'),
            skillTypeData: {},
            skillCategoryData: {},
            numSkill: 0,
            rows: [],
            num: 0,
            editMode: 0, // 1 for edit mode
            editingRows: [],
            editedCompetencies: [],
            checks: [], // array of checks status for every user skill
            numChecked: 0, // number of checks for deleting skills
            errors: {},
            blank: '',
            userSkillNum: 0,
            userCompetencies: [],
            userSkillIds: []
        };
        this.getSkills = this.getSkills.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMode = this.handleMode.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.state.num = 0;
        this.state.userCompetencies = [];
        this.state.editedCompetencies = [];
        this.getSkillCategories();
        console.log('refresh the page with ' + this.state.userSkillNum + ' skills');
    }

    handleSelect() {
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
                                                                value={this.state.blank}
                                                                error={this.state.errors.blank}
                                                                data={competencyData}
                                                                controlFunc={this.handleSelect}
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

    handleMode() {
        this.setState({
            editMode: 1
        });
    }

    handleEditing() {
        console.log('Rhoda is in handleEditing -> ');
        let differenceCount = 0;
        this.setState({
            editMode: 0
        });
        // this.state.userCompetencies.length === this.state.checkes.length
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
            console.log('here because more than 1 checks' + this.state.checks);
            for (let i = 0; i < this.state.checks.length; i++ ) {
                console.log(this.state.checks[i] === 1);
                if ( this.state.checks[i] === 1) {
                    console.log('->' + this.state.checks[i]);
                    const id = this.state.userSkillIds[i];
                    axios.delete('https://methanex-portfolio-management.herokuapp.com/user-skills/' + id, {
                    }).then((response) => {
//                        this.state.userSkillNum--;
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
//            this.getSkills(); // NOPE
            console.log(differenceCount);
            console.log(this.state.userCompetencies);
            console.log(this.state.editedCompetencies);
            alert('successful');
        }
        console.log('Rhoda leaves handleEditing with ' + this.state.userSkillNum + ' skills for this user');
        this.state.userSkillNum = 0; // update each time editing is completed otherwise
                                     // it only updates when we manually refresh the page
        alert('all changes made!!!!');
    }

    handleDelete() {
        let tempNumChecked = 0;
        const tempChecks = []; // temp: array of checks status for every user skill --> checks
        console.log('Rhoda is in handleDelete');
        console.log('There are ' + document.getElementsByTagName('input').length + ' checkboxes');
        for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
            if (document.getElementsByTagName('input')[i].checked) {
    //        if (document.querySelector('input[id="delete"]')[0].checked) {
    //        document.querySelector('input[id="delete"]') // this returns the tag
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
//        for (let i = 0; i < document.getElementsByTagName('select').length; i++) {
//                    const skillCompetency = document.getElementsByTagName('select')[i].value;
//                    competencies.push(skillCompetency);
//        }
        this.state.numChecked = tempNumChecked;
        console.log('Overall So far there are ' + this.state.numChecked + ' checks');
        console.log('Rhoda leaves handleDelete');
    }

    render() {
        const { editMode, userSkillNum } = this.state;
        console.log('rendering: currently user has ' + userSkillNum + ' skills');
        let columns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        let editingColumns = ['ID', 'Skill Category', 'Skill Name', 'Competency', 'New Competency', 'Remove Skill'];
        if (editMode) {
            return(
               <div className={ skill }>
                    <h1>Editing Skills</h1>
                    <Table text="List of Skills" columns={editingColumns} rows={this.state.editingRows}/>
                    <Link to = "/">
                        <button onClick={this.handleEditing}>save changes</button>
                    </Link>
                </div>
            );
        }
        if (userSkillNum === 0) {
            return(
               <div className={ skill }>
                    <h4><i>you currently have no skill...</i></h4>
                    <Link to = "/skill/addSkill">
                        <Button
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
                <Link to = "/skill/addSkill">
                    <Button
                        label="Add Skill"
                    />
                </Link>
                <br />
                <button onClick={this.handleMode}>Edit Skill</button>
                <br />
            </div>
        );
    }
}
//                <input type="checkbox" id="delete" onClick={this.handleDelete} />
export default Skill;
