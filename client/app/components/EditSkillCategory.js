import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import TextFieldGroup from './TextFieldGroup';

class EditSkillCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillCategories: [],
            categoryID: '',
            newSkillCategory: '',
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
        this.getSkillCategories();
    }

    getSkillCategories() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories').then((response) => {
            this.setState({skillCategories: response.data});
        });
    }

    isValid() {
        let isValid = true;

        if (!this.state.categoryID) {
           this.setState({errors: { categoryID: 'Select a Skill Category' }});
           isValid = false;
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.put('https://methanex-portfolio-management.herokuapp.com/skill-categories/' + this.state.categoryID, {
                name: this.state.newSkillCategory
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        categoryID: '',
                        newSkillCategory: '',
                        hasOptionSelected: false,
                        errors: {}, successModalOpen: true
                    });
                }
            }).catch((error) => {
                this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true });
            });
        }
    }

    handleSelect(e) {
        this.setState({
            [e.target.name]: e.target.value,
            hasOptionSelected: true
        });
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
        const { skillCategories, newSkillCategory, successModalOpen, errorModalOpen, errorMessage, hasOptionSelected, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Edit Skill Category</h2>
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
                    label="Select a Skill Category to Delete"
                    name="categoryID"
                    data={skillCategories}
                    onSelect={this.handleSelect}
                    error={errors.categoryID}
                />

                {hasOptionSelected &&
                    <TextFieldGroup
                        field="newSkillCategory"
                        label="Enter New Name for Skill Category"
                        value={newSkillCategory}
                        error={errors.skillCategories}
                        onChange={this.onChange}
                    />
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

export default EditSkillCategory;
