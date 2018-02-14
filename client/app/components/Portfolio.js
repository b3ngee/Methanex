import React from 'react';
import { portfolio } from '../styles/portfolio.scss';
import Dropdown from './Dropdown.js';

let portfolioData1 = {
    choices: [
        'Project Infrastructure Reboot',
        'Project UBC'
    ]
};

let portfolioData2 = {
    choices: [
        'Project A',
        'Project B',
        'Project X',
        'Project XYB',
        'Project ReVamp HR'
    ]
};

const Portfolio = () =>
    <div className={ portfolio }>
        <h1>Hello Jane</h1>
        <p>{"Here's an overview of your portfolios."}</p>
        <div>
            <Dropdown data={portfolioData1}/>
            <Dropdown data={portfolioData2}/>
        </div>
    </div>;

export default Portfolio;
