import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table.js';
import Button from './Button';
import { Link } from 'react-router-dom';

let skillsTable = {
    columns: ['Skill Name', 'Skill Competency'],
    rows: [{
        'Skill Name': 'Java',
        'Skill Competency': 5
    }, {
        'Skill Name': 'JavaScript',
        'Skill Competency': 5
    }]
};

const StandardUser = () =>
    <div className={ project }>
        <h1>My Skills</h1>
        <Table text="My Skills" data={skillsTable}/>
        <Link to = "/addSkillPage">
            <Button text="Add Skill(s)"/>
        </Link>
        <Button text="Edit Skill(s)"/>
        <Button text="Delete Skill(s)"/>
    </div>;

export default StandardUser;
