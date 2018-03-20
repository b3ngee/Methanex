import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import TextFieldGroup from './TextFieldGroup';

class EditSkillType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillTypes: [],
            skillTypeID: '',
            newSkillType: '',
            skillCategory: [],
            categoryID: '',
            hasOptionSelected: false,
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getSkillTypes();
        this.getSkillCategories();
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({skillTypes: response.data});
        });
    }

    getSkillCategories() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({skillCategory: response.data});
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

    handleSelect(e) {
        let catId;
        for(let i = 0; i < this.state.skillTypes.length; i ++) {
            if (this.state.skillTypes[i].id === Number(e.target.value)) {
                catId = this.state.skillTypes[i].skillCategoryId;
            }
        }

        this.setState({
            [e.target.name]: e.target.value,
            categoryID: catId,
            hasOptionSelected: true
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.put('https://methanex-portfolio-management.herokuapp.com/skill-types/' + this.state.skillTypeID, {
                name: this.state.newSkillType,
                skillCategoryId: this.state.categoryID
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        skillTypeID: '',
                        categoryID: '',
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
        const { skillTypes, newSkillType, skillCategory, categoryID, successModalOpen, errorModalOpen, hasOptionSelected, errorMessage, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Edit Skill Type</h2>
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
                    onSelect={this.handleSelect}
                    error={errors.skillTypeID}
                />
                {hasOptionSelected &&
                  <div>
                    <Dropdown
                        label="Change Skill Category (optional)"
                        name="categoryID"
                        data={skillCategory}
                        preSelect= {categoryID}
                        onSelect={this.onChange}
                    />
                    <TextFieldGroup
                        field="newSkillType"
                        label="Enter New Name for Skill Type"
                        value={newSkillType}
                        error={errors.skillTypes}
                        onChange={this.onChange}
                    />
                  </div>
                }
                <Button
                    type="submit"
                    label="Submit"
                />
            </form>
        </div>
        );
    }
}

export default EditSkillType;
