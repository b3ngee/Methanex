import React from 'react';
import Table from './Table.js';
import { project } from '../styles/project.scss';
import Login from './Login';

let tableData = {
    columns: ['Project Name', 'Project Manager', 'Status'],
    rows: [{
        'Project Name': 'FB',
        'Project Manager': 'Ben Gee',
        'Status': 'Red'
    }, {
        'Project Name': 'GOOGLE',
        'Project Manager': 'Ben Gee',
        'Status': 'Red'
    }, {
        'Project Name': 'MSFT',
        'Project Manager': 'Colby Song',
        'Status': 'Green'
    }, {
        'Project Name': 'TWITCH',
        'Project Manager': 'Lansi Chu',
        'Status': 'Red'
    }, {
        'Project Name': 'EA',
        'Project Manager': 'Yoony Ok',
        'Status': 'Red'
    }]
};

const Project = () =>
    <div className={ project }>
        <h1>My Project</h1>
        <Login/>
        <Table text="List of Projects" data={tableData}/>
    </div>;

export default Project;
