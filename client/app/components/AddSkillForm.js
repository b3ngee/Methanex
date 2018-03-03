import React from 'react';
import Dropdown from './Dropdown.js';
import TextFieldGroup from './TextFieldGroup';


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
            errors: {}
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
            this.setState({ errors: { skillCategory: 'skill category is required' }});
            return false;
        }
        if (!this.state.skillType) {
            this.setState({ errors: { skillType: 'skill type is required' }});
            return false;
        }
        if (!this.state.skillCompetency) {
            this.setState({errors: { skillCompetency: 'skill competency is required'}});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        // Todo:
        if (this.isValid()) {
            alert('new skill has been added');
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, skillCategory, skillType, skillCompetency } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div onChange={this.handleSelect}>
                    <Dropdown data={skillCategoryData}/>
                </div>
                <TextFieldGroup
                    field="skillCategory"
                    label="Skill Category:"
                    value={skillCategory}
                    error={errors.skillCategory}
                    onChange={this.onChange}
                />
                <br/>

                <div onChange={this.handleSelect}>
                    <Dropdown data={skillData}/>
                </div>
                <TextFieldGroup
                    field="skillType"
                    label="Specific Skill:"
                    value={skillType}
                    error={errors.skillType}
                    onChange={this.onChange}
                />
                <br/>

                <div onChange={this.handleSelect}>
                    <Dropdown data={competencyData}/>
                </div>
                <TextFieldGroup
                    field="skillCompetency"
                    label="Competency Level:"
                    value={skillCompetency}
                    error={errors.skillCompetency}
                    onChange={this.onChange}
                />
                <br/>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

AddSkillForm.propTypes = {
    history: React.PropTypes.object
};

export default AddSkillForm;
