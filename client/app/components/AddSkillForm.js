import React from 'react';
import Dropdown from './Dropdown.js';

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

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSubmit(event) {
        alert('new skill has been added');
        event.preventDefault();
        // Todo:
    }

    handleSelect() {
        document.getElementById('skill_type').value = document.getElementById('skillTypes').value;
        document.getElementById('skill_category').value = document.getElementById('skillCategory').value;
        document.getElementById('skill_competency').value = document.getElementById('competency').value;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div onChange={this.handleSelect}>
                    <Dropdown id="skillCategory" data={skillCategoryData}/>
                </div>
                <label htmlFor="skill_category">
                    Skill Category:
                    <input id="skill_category" type="text" />
                </label>
                <br/>
                <div onChange={this.handleSelect}>
                    <Dropdown id="skillTypes" data={skillData}/>
                </div>
                <label htmlFor="skill_type">
                    Specific Skill:
                    <input id="skill_type" type="text" ref="skill_type" placeholder = "" />
                </label>
                <br/>
                <div onChange={this.handleSelect}>
                    <Dropdown id="competency" data={competencyData}/>
                </div>
                <label htmlFor="skill_competency">
                    Competency Level:
                    <input id="skill_competency" type="text" />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
export default AddSkillForm;
