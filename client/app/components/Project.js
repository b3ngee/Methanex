import React from 'react';
import Table from './Table.js';
import { project } from '../styles/project.scss';
import Navbar from './Navbar';
import axios from 'axios';

let projectCount = 0;
axios.get('https://private-05c14-methanex.apiary-mock.com/projects?portfolioType=&projectOwner=')
    .then(response => {
        projectCount = JSON.parse(response.data).length;
        console.log(projectCount);
        localStorage.setItem('projects', response.data);
        console.log(localStorage.getItem('projects'));
    })
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });

let tableData = {
    columns: ['Project Name', 'Project Manager', 'Status'],
    rows: [{
        'Project Name': 'FB',
        'Project Manager': 'Ben Gee',
        'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
    }, {
        'Project Name': 'GOOGLE',
        'Project Manager': 'Ben Gee',
        'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
    }, {
        'Project Name': 'MSFT',
        'Project Manager': 'Colby Song',
        'Status': <img style={{width: 15, height: 20}} src={require('../images/greenLightBulb.png')} />
    }, {
        'Project Name': 'TWITCH',
        'Project Manager': 'Lansi Chu',
        'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
    }, {
        'Project Name': 'EA',
        'Project Manager': 'Yoony Ok',
        'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
    }, {
        'Project Name': 'UBC',
        'Project Manager': 'Harnoor Shoker',
        'Status': <img style={{width: 15, height: 20}} src={require('../images/amberLightBulb.jpg')} />
    }]
};

const Project = () =>
    <div className={ project }>
        <h1>My Project</h1>
        <Navbar/>
        <Table text="List of Projects" data={tableData}/>
    </div>;

export default Project;
