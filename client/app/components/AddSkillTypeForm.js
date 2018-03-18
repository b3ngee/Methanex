import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import Dropdown from './Dropdown';

class AddSkillTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              skillCategories: [],
              categoryID: '',
              skillType: '',
              errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    // Gets skill categories - with name and ID
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

        if (!this.state.skillType) {
            this.setState({ errors: { skillType: 'Skill Type is Required' }});
            isValid = false;
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/skill-types', {
                name: this.state.skillType,
                skillCategoryId: this.state.categoryID
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({
                        categoryID: '',
                        skillType: '',
                        errors: {},
                    });
                }
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { skillCategories, skillType, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Skill Type</h2>

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
