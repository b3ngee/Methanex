import React from 'react';
import Dropdown from './Dropdown';
import TextFieldGroup from './TextFieldGroup';
import { formBox } from '../styles/form.scss';
import Button from './Button';
import axios from 'axios';

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
            theChosenCategoryId: '',
            theChosenSkillId: '',
            numUser: 0,
            userId: localStorage.getItem('user_id'),
            blank: '',
            categoryData: [],
            skillCategoryData: {},
            skillData: [],
            skillTypeData: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    getSkillCategories() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories').then( (response) => {
            this.setState({ skillCategoryData: response.data });
            this.getCategories();
        });
    }
    getCategories() {
        for(let i = 0; i < this.state.skillCategoryData.length; i++) {
            this.state.categoryData.push(this.state.skillCategoryData[i].name);
        }
        this.setState({
            categoryData: this.state.categoryData
        });
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types').then( (response) => {
            this.setState({ skillTypeData: response.data });
            this.getSkills();
        });
    }
    getSkills() {
        for(let i = 0; i < this.state.skillCategoryData.length; i++) {
            if (this.state.skillCategory === this.state.skillCategoryData[i].name) {
                this.setState({
                    theChosenCategoryId: this.state.skillCategoryData[i].id
                });
            }
        }
        this.state.skillData = [];
        for(let i = 0; i < this.state.skillTypeData.length; i++) {
            if (this.state.theChosenCategoryId === this.state.skillTypeData[i].skillCategoryId) {
                this.state.skillData.push(this.state.skillTypeData[i].name);
            }
        }
        this.setState({
            skillData: this.state.skillData
        });
    }

    handleCategorySelect() {
        document.getElementsByTagName('input')[0].value = document.getElementsByTagName('select')[0].value;
        this.setState({
            skillCategory: document.getElementsByTagName('select')[0].value,
            skillType: 'Select ... '

        });
        document.getElementsByTagName('input')[2].value = document.getElementsByTagName('select')[2].value;
        this.getSkillTypes();
    }

    handleSelect() {
        document.getElementsByTagName('input')[1].value = document.getElementsByTagName('select')[1].value;
        this.setState({ skillType: document.getElementsByTagName('select')[1].value });
        document.getElementsByTagName('input')[2].value = document.getElementsByTagName('select')[2].value;
        this.setState({ skillCompetency: document.getElementsByTagName('select')[2].value });
        for(let i = 0; i < this.state.skillTypeData.length; i++) {
            if (this.state.skillType === this.state.skillTypeData[i].name) {
                this.setState({ theChosenSkillId: this.state.skillTypeData[i].id });
            }
        }
        console.log('omg ' + this.state.theChosenSkillId);
    }

    isValid() {
        if (!this.state.skillCategory || document.getElementsByTagName('input')[0].value === 'Select ... ') {
            this.setState({ errors: { skillCategory: 'skill category is required!' }});
            return false;
        }
        if (!this.state.skillType || document.getElementsByTagName('input')[1].value === 'Select ... ') {
            this.setState({ errors: { skillType: 'skill type is required!' }});
            return false;
        }
        if (!this.state.skillCompetency || document.getElementsByTagName('input')[2].value === 'Select ... ') {
            this.setState({errors: { skillCompetency: 'skill competency is required!'}});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/user-skills', {
                userId: this.state.userId,
                skillTypeId: this.state.theChosenSkillId,
                competency: this.state.skillCompetency
            }).then( (response) => {
                if (response.status === 201) {
                    this.setState({
                        userId: '',
                        skillTypeId: '',
                        competency: '',
                        errors: {},
                    });
                    alert('new skill has been added');
                }
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, skillCategory, skillType, skillCompetency, blank, categoryData, skillData } = this.state;
                console.log('omg ' + this.state.userId);
        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2> Add new skill</h2>
                    <TextFieldGroup
                        field="skillCategory"
                        label=" "
                        value={skillCategory}
                        error={errors.skillCategory}
                        onChange={this.onChange}
                    />
                    <Dropdown
                        label="Select a Category first"
                        value={blank}
                        error={errors.blank}
                        data={categoryData}
                        controlFunc={this.handleCategorySelect}
                    />

                    <TextFieldGroup
                        field="skillType"
                        label=" "
                        value={skillType}
                        error={errors.skillType}
                        onChange={this.onChange}
                    />
                    <Dropdown
                        label="Select a Skill"
                        value={blank}
                        error={errors.blank}
                        data={skillData}
                        controlFunc={this.handleSelect}
                    />
                    <TextFieldGroup
                        field="skillCompetency"
                        label=" "
                        value={skillCompetency}
                        error={errors.skillCompetency}
                        onChange={this.onChange}
                    />
                    <Dropdown
                        label="Select a Competency Level"
                        value={blank}
                        error={errors.blank}
                        data={competencyData}
                        controlFunc={this.handleSelect}
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

AddSkillForm.propTypes = {
    history: React.PropTypes.object
};

export default AddSkillForm;
