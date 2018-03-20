import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { skill } from '../styles/skill.scss';
import Button from './Button';
import Table from './Table';
import Dropdown from './Dropdown';
import { COMPETENCY } from '../constants/constants.js';
import PopupBox from './PopupBox';

class EditExistingSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successModalOpen: false,
            userId: localStorage.getItem('user_id'),
            skills: this.props.location.state.skillsData,
            userSkillIds: this.props.location.state.skillIdsData,
            numSkills: this.props.location.state.skillsData.length,
            skillTypeData: {}, // TODO?
            skillCategoryData: {},  // TODO ?
            rows: [], // TODO?
            rowNum: 0,
            editingRows: [], // REQUIRED
            editedCompetencies: [], // REQUIRED
            checks: [], // array of checks status for every user skill
            numChecked: 0, // number of checks for deleting skills
            errors: {}, // TODO?
            userCompetencies: [], // TODO?
        };
        this.onCloseSuccess = this.onCloseSuccess.bind(this);

        this.handleMultipleSelects = this.handleMultipleSelects.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getRows();
    }

    getRows() {
        const tableDataForEdit = [];
        for (let i = 0; i < this.state.numSkills; i++) {
            this.state.userCompetencies.push(Object.values(this.state.skills[i])[3]);
            tableDataForEdit.push({
                'ID': this.state.rowNum + 1,
                'Skill Category': Object.values(this.state.skills[i])[1],
                'Skill Name': Object.values(this.state.skills[i])[2],
                'Competency': Object.values(this.state.skills[i])[3],
                'New Competency': <Dropdown
                                      label=""
                                      name="sC"
                                      data={COMPETENCY}
                                      onSelect={this.handleMultipleSelects}
                                      error={this.state.errors.sC}
                                   />,
                'Remove Skill': <input type="checkbox" onClick={this.handleDelete} />
            });
            this.state.rowNum++;
        }
        this.setState({ editingRows: tableDataForEdit});
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
        const tempChecks = [];
        for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
            if (document.getElementsByTagName('input')[i].checked) {
                tempNumChecked++;
                tempChecks.push(1);
            } else {
                tempChecks.push(0);
            }
        }
        this.state.checks = tempChecks;
        this.state.numChecked = tempNumChecked;
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
        }
        this.setState({ successModalOpen: true });
    }

    onCloseSuccess() {
        window.history.back();
    }

    render() {
        const { numSkill, successModalOpen } = this.state;
        let editingColumns = ['ID', 'Skill Category', 'Skill Name', 'Competency', 'New Competency', 'Remove Skill'];
        const data = [{'Value': localStorage.user_id}];
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
                <h1>Editing Skills</h1>
                <PopupBox
                    label="Successful!"
                    isOpen={successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <Table text="List of Skills" columns={editingColumns} rows={this.state.editingRows}/>
                <Link to = {{pathname: '/', state: {data}}}>
                    <Button
                        type="submit"
                        label="save changes"
                        onClick={this.handleEditing}
                    />
                </Link>
            </div>
        );
    }
}

EditExistingSkill.propTypes = {
    history: React.PropTypes.any,
    location: PropTypes.any,
};

export default EditExistingSkill;
