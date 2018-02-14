import React from 'react';
import { resource } from '../styles/resource.scss';
import Table from './Table.js';


let tableData = {
    columns: ['Resource Name', 'Resource Manager', 'Skills', 'Department'],
    rows: [{
        'Resource Name': 'Daniel Chen',
        'Resource Manager': 'Jane Doe',
        'Skills': 'Java, SQL',
        'Department': 'IT'
    }, {
        'Resource Name': 'Lansi Chu',
        'Resource Manager': 'Daniel Choi',
        'Skills': 'Java, React',
        'Department': 'IT'
    }, {
        'Resource Name': 'Harnoor Shoker',
        'Resource Manager': 'Daniel Choi',
        'Skills': 'Java, MySQL',
        'Department': 'IT'
    }, {
        'Resource Name': 'Ben Gee',
        'Resource Manager': 'Jane Doe',
        'Skills': 'Java',
        'Department': 'Business'
    }, {
        'Resource Name': 'Stella Fang',
        'Resource Manager': 'Jane Doe',
        'Skills': 'Java',
        'Department': 'Business'
    }]
};

const Resource = () =>
    <div className={ resource }>
        <h1>My Resource</h1>
        <Table text="List of Resources" data={tableData}/>
    </div>;

export default Resource;
