import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';

class DeleteSkillCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillCategories: [],
            categoryID: '',
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
            axios.delete('https://methanex-portfolio-management.herokuapp.com/skill-categories/' + this.state.categoryID, {
                id: this.state.categoryID
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
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
        const { skillCategories, successModalOpen, errorModalOpen, errorMessage, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Delete Skill Category</h2>
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
                    onSelect={this.onChange}
                    error={errors.categoryID}
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

export default DeleteSkillCategoryForm;
