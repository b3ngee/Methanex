import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

class AddSkillTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              skillType: '',
              errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        if(!this.state.skillType) {
            this.setState({ errors: { skillType: 'Skill type is required' }});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/skill-types', {
                skill_type: this.skillType
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'skill_type_added') {
                    this.setState({
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
        const { skillType, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Skill Type</h2>

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
