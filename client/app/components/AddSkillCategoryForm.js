import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import { prodAPIEndpoint } from '../constants/constants';

class AddSkillCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillCategory: '',
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    isValid() {
        if(!this.state.skillCategory) {
            this.setState({ errors: { skillCategory: 'Skill category is required' }});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post(prodAPIEndpoint + '/skill-categories', {
                name: this.state.skillCategory
            }).then((response) => {
                if (response.status === 201) {
                    const skillCategory = this.state.skillCategory;
                    this.setState({ skillCategory: '', successModalOpen: true});
                    this.props.onSubmit(skillCategory);
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
        const { skillCategory, errors, successModalOpen, errorModalOpen, errorMessage } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Skill Category</h2>
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
                <TextFieldGroup
                    field="skillCategory"
                    label="New Skill Category"
                    value={skillCategory}
                    error={errors.skillCategory}
                    onChange={this.onChange}
                />
                <Button
                    type="submit"
                    label="Submit"
                />
            </form>
        </div>
        );
    }
}

AddSkillCategoryForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default AddSkillCategoryForm;
