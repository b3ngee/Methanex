import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import Dropdown from './Dropdown';
import PopupBox from './PopupBox';
import { prodAPIEndpoint } from '../constants/constants';

class AddSkillTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillCategories: [],
            categoryID: '',
            skillType: '',
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
        this.getSkillCategories();
    }

    // Gets skill categories - with name and ID
    getSkillCategories() {
        axios.get(prodAPIEndpoint + '/skill-categories', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({skillCategories: response.data});
        });
    }

    isValid() {
        let isValid = true;

        if (!this.state.categoryID) {
           this.setState({errors: { categoryID: 'Select a Skill Category' }});
           isValid = false;
        }

        if (!this.state.skillType) {
            this.setState({ errors: { skillType: 'Skill Type is Required' }});
            isValid = false;
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post(prodAPIEndpoint + '/skill-types', {
                name: this.state.skillType,
                skillCategoryId: this.state.categoryID
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({
                        categoryID: '',
                        skillType: '',
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
        const { skillCategories, skillType, errors, successModalOpen, errorModalOpen, errorMessage } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Skill Type</h2>
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
                    label="Select a Skill Category"
                    name="categoryID"
                    data={skillCategories}
                    onSelect={this.onChange}
                    error={errors.categoryID}
                />

                <TextFieldGroup
                    field="skillType"
                    label="New Skill Type"
                    value={skillType}
                    error={errors.skillType}
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

export default AddSkillTypeForm;
