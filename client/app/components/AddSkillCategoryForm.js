import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

class AddSkillCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              skillCategory: '',
              errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
            axios.post('https://methanex-portfolio-management.herokuapp.com/skill-categories', {
                name: this.state.skillCategory
            }).then((response) => {
                if (response.status === 201) {
                    const skillCategory = this.state.skillCategory;
                    this.setState({ skillCategory: '' });
                    this.props.onSubmit(skillCategory);
                }
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { skillCategory, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Skill Category</h2>

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
