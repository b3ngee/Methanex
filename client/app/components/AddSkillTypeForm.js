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
              skillCategories: {},
              categoryID: '',
              skillType: '',
              errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
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

    // Retrieves category name to pass to dropdown
    getCategoryName(skillCategory) {
        this.skillCategory = this.state.skillCategories;

        const options = [];
        for(let i = 0; i < skillCategory.length; i++) {
            options.push(skillCategory[i].name);
        }

        return options;
    }

    isValid() {
        if(this.state.categoryID === '') {
           this.setState({errors: { categoryID: 'Select a Skill Category' }});
           return false;
        }

        if(!this.state.skillType) {
            this.setState({ errors: { skillType: 'Skill Type is Required' }});
            return false;
        }

        return true;
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

    handleOptionSelected(e) {
        for (let i = 0; i < this.state.skillCategories.length; i++) {
            if (this.state.skillCategories[i].name === e.target.value) {
                this.setState({
                    categoryID: this.state.skillCategories[i].id.toString()
                    });
                }
        }
    }

    onChange(e) {
            this.setState({
                [e.target.name]: e.target.value
            });
    }

    render() {
        const {
            skillCategories,
            categoryID,
            skillType,
            errors
            } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Skill Type</h2>

                <Dropdown
                    label="Select a Skill Category"
                    value={categoryID}
                    error={errors.categoryID}
                    data={this.getCategoryName(skillCategories)}
                    onSelect={this.handleOptionSelected}
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
