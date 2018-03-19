import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';

class DeleteSkillTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillTypes: [],
            skillTypeID: '',
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getSkillTypes();
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types').then((response) => {
            this.setState({skillTypes: response.data});
        });
    }

    isValid() {
        let isValid = true;

        if (!this.state.skillTypeID) {
           this.setState({errors: { skillTypeID: 'Select a Skill Type' }});
           isValid = false;
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.delete('https://methanex-portfolio-management.herokuapp.com/skill-types/' + this.state.skillTypeID, {
                id: this.state.skillTypeID
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        skillTypeID: '',
                        errors: {}, successModalOpen: true
                    });
                }
            }).catch((error) => {
                this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true });
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { skillTypes, successModalOpen, errorModalOpen, errorMessage, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Delete Skill Type</h2>
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
                <Dropdown
                    label="Select a Skill Type to Delete"
                    name="skillTypeID"
                    data={skillTypes}
                    onSelect={this.onChange}
                    error={errors.skillTypeID}
                />
                <Button
                    type="submit"
                    label="Delete"
                />
            </form>
        </div>
        );
    }
}

export default DeleteSkillTypeForm;
