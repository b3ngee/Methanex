import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import { skill } from '../styles/skill.scss';
import Button from './Button';
import Table from './Table';
import Dropdown from './Dropdown';
import { prodAPIEndpoint, COMPETENCY } from '../constants/constants.js';
import PopupBox from './PopupBox';
import PopupBoxTwoButtons from './PopupBoxTwoButtons';

class EditExistingSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deletionModalOpen: false,
            successModalOpen: false,
            errorModalOpen: false,
            userId: this.props.location.state.data[0].Value,
            skills: this.props.location.state.skillsData,
            userSkillIds: this.props.location.state.skillIdsData,
            numSkills: this.props.location.state.skillsData.length,
            editingRows: [],
            editedCompetencies: [],
            checks: [], // array of checks status for every user skill
            numChecked: 0, // number of checks for deleting skills
            userCompetencies: [],
        };
        this.onCloseDeletion = this.onCloseDeletion.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
        this.onCancelDeletion = this.onCancelDeletion.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.confirmEditing = this.confirmEditing.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getRows();
    }

    getRows() {
        const tableDataForEdit = [];
        for (let i = 0; i < this.state.numSkills; i++) {
            this.state.userCompetencies.push(Object.values(this.state.skills[i])[2]);
            tableDataForEdit.push({
                'Skill Category': Object.values(this.state.skills[i])[0],
                'Skill Name': Object.values(this.state.skills[i])[1],
                'Competency': Object.values(this.state.skills[i])[2],
                'New Competency': <Dropdown
                                      label=""
                                      name={i}
                                      data={COMPETENCY}
                                      onSelect={this.handleSelect}
                                   />,
                'Remove Skill': <input type="checkbox" value={i} onClick={this.handleDelete} />
            });
        }
        this.setState({ editingRows: tableDataForEdit});
    }

    handleSelect(e) {
        const competencies = this.state.editedCompetencies;
        competencies[e.target.name] = e.target.value;
    }

    handleDelete(e) {
        const tempChecks = this.state.checks;
        tempChecks[e.target.value] = e.target.checked;
    }

    handleEditing() {
        let differenceCount = 0;
        for (let i = 0; i < this.state.userCompetencies.length; i++) {
            if ( this.state.userCompetencies[i] - this.state.editedCompetencies[i] ) {
                differenceCount++;
            }
        }
        for (let i = 0; i < this.state.checks.length; i++) {
            if (this.state.checks[i] === true) {
                this.state.numChecked++;
            }
        }
        if ( differenceCount === 0 && this.state.numChecked === 0 ||
            this.state.editedCompetencies.length === 0 && this.state.numChecked === 0
        ) {
            this.setState({ errorModalOpen: true, errorMessage: 'no changes were made' });
        } else {
            this.setState({deletionModalOpen: true });
        }
    }

    confirmEditing() {
        for (let i = 0; i < this.state.userCompetencies.length; i++) {
            if ( this.state.userCompetencies[i] - this.state.editedCompetencies[i] ) {
                const id = this.state.userSkillIds[i];
                const c = this.state.editedCompetencies[i];
                axios.put(prodAPIEndpoint + '/user-skills/' + id, {
                    competency: c
                }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, requestModalOpen: false, errorModalOpen: true }); });
            }
        }

        if (this.state.numChecked !== 0) {
            for (let i = 0; i < this.state.checks.length; i++ ) {
                if ( this.state.checks[i] === true) {
                    const id = this.state.userSkillIds[i];
                    axios.delete(prodAPIEndpoint + '/user-skills/' + id, {
                    }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, requestModalOpen: false, errorModalOpen: true }); });
                }
            }
        }

        this.setState({ deletionModalOpen: false, successModalOpen: true });
    }

    onCloseDeletion() {
        this.confirmEditing();
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
        window.history.back();
    }

    onCancelDeletion() {
        this.setState({
            deletionModalOpen: false,
            errorMessage: 'changes has been canceled',
            errorModalOpen: true
        });
    }

    render() {
        const { deletionModalOpen, successModalOpen, errorModalOpen, errorMessage } = this.state;
        let editingColumns = ['Skill Category', 'Skill Name', 'Competency', 'New Competency', 'Remove Skill'];

        return(
            <div className={ skill }>
                <h1>Editing Skills</h1>
                <PopupBoxTwoButtons
                    label="Are you sure about the changes?"
                    isOpen={deletionModalOpen}
                    onClose={this.onCloseDeletion}
                    onCancel={this.onCancelDeletion}
                />
                <PopupBox
                    label="Successful!"
                    isOpen={successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <Table text="List of Skills" columns={editingColumns} rows={this.state.editingRows}/>
                <Button
                    type="submit"
                    label="save changes"
                    onClick={this.handleEditing}
                />
            </div>
        );
    }
}

EditExistingSkill.propTypes = {
    history: React.PropTypes.any,
    location: PropTypes.any,
};

export default EditExistingSkill;
