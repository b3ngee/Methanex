import React from 'react';
import Dropdown from './Dropdown.js';
import TextFieldGroup from './TextFieldGroup';
import { formBox } from '../styles/form.scss';
import Button from './Button';
import axios from 'axios';


let skillData = [
    'SQL 11 .x',
    'Node.JS',
    'Cisco IOS',
    'Phython',
    'Java',
    'MySQL',
    'SQL',
    'React'];
let skillCategoryData = [
    'Technical',
    'Non-technical'];
let competencyData = [
    '1',
    '2',
    '3',
    '4',
    '5'];

class AddSkillForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skillCategory: '',
            skillType: '',
            skillCompetency: '',
            errors: {},
            numSkillType: 0,
            skillTypeId: '',
            numUser: 0,
            userId: ''
//            numSkillCategory: 0,
//            skillCategoryId: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    handleSelect() {
        document.getElementsByTagName('input')[0].value = document.getElementsByTagName('select')[0].value;
        this.setState({ skillCategory: document.getElementsByTagName('select')[0].value });
        document.getElementsByTagName('input')[1].value = document.getElementsByTagName('select')[1].value;
        this.setState({ skillType: document.getElementsByTagName('select')[1].value });
        document.getElementsByTagName('input')[2].value = document.getElementsByTagName('select')[2].value;
        this.setState({ skillCompetency: document.getElementsByTagName('select')[2].value });
    }

    isValid() {
        if (!this.state.skillCategory) {
            this.setState({ errors: { skillCategory: 'skill category is required!' }});
            return false;
        }
        if (!this.state.skillType) {
            this.setState({ errors: { skillType: 'skill type is required!' }});
            return false;
        }
        if (!this.state.skillCompetency) {
            this.setState({errors: { skillCompetency: 'skill competency is required!'}});
            return false;
        }

        return true;
    }

    getUserSkill() {
        // TODO: change endpoints

        // TODO: get the skill_type_id from SKILL_TYPE with skill_type_name
        axios.get('https://private-3bb33-methanex.apiary-mock.com/skills?resourceId=').then(response => {
            this.setState({ numSkillType: response.data.length });
            this.setState({ skillTypes: response.data });

            for (let i = 0; i < this.state.numSkill; i++) {
                if( this.state.skillTypes[i].skill_type_name === this.state.skillType) {
                    this.state.skillTypeId = this.state.skillTypes[i].skill_type_id;
                }
            }
        }).catch( () => {
        });
        // TODO: get the user_id from USER with user_name
        axios.get('https://private-3bb33-methanex.apiary-mock.com/skills?resourceId=').then(response => {
            this.setState({ numUser: response.data.length });
            this.setState({ users: response.data });

            for (let i = 0; i < this.state.numUser; i++) {
                if( this.state.users[i].user_name === localStorage.getItem('user_name')) {
                    this.state.userId = this.state.users[i].user_id;
                }
            }
        }).catch( () => {
        });
        // TODO: get the skill_category_id from SKILL_CATEGORY with skill_category_name
//        axios.get('https://private-3bb33-methanex.apiary-mock.com/skills?resourceId=').then(response => {
//            this.setState({ numSkillCategory: response.data.length });
//            this.setState({ skillCategories: response.data });
//
//            for (let i = 0; i < this.state.numSkill; i++) {
//                if( this.state.skillTypes[i].skill_category_name === skillCategory) {
//                    this.state.skillCategoryId = this.state.skillCategories[i].skill_category_id;
//                }
//            }
//        }).catch( () => {
//        });
    }

    onSubmit(e) {
        e.preventDefault();
        // Todo: change endpoints
        if (this.isValid()) {
            this.getUserSkill();
            axios.post('https://private-3bb33-methanex.apiary-mock.com/user-skill', {
                user_id: this.state.userId, // todo
                skill_type_id: this.state.skillTypeId,
                competency: this.state.skillCompetency
            }).then(
                alert('new skill has been added')
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, skillCategory, skillType, skillCompetency } = this.state;

        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2> Add new skill</h2>
                    <TextFieldGroup
                        field="skillCategory"
                        label="Skill Category:"
                        value={skillCategory}
                        error={errors.skillCategory}
                        onChange={this.onChange}
                    />
                    <div onChange={this.handleSelect}>
                        <Dropdown data={skillCategoryData}/>
                    </div>
                    <br/>

                    <TextFieldGroup
                        field="skillType"
                        label="Specific Skill:"
                        value={skillType}
                        error={errors.skillType}
                        onChange={this.onChange}
                    />
                    <div onChange={this.handleSelect}>
                        <Dropdown data={skillData}/>
                    </div>
                    <br/>

                    <TextFieldGroup
                        field="skillCompetency"
                        label="Competency Level:"
                        value={skillCompetency}
                        error={errors.skillCompetency}
                        onChange={this.onChange}
                    />
                    <div onChange={this.handleSelect}>
                        <Dropdown data={competencyData}/>
                    </div>
                    <Button
                        type="submit"
                        label="Submit"
                    />
                </form>
            </div>
        );
    }
}

AddSkillForm.propTypes = {
    history: React.PropTypes.object
};

export default AddSkillForm;
