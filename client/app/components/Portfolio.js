import React from 'react';
import { portfolio } from '../styles/portfolio.scss';
import Dropdown from './Dropdown.js';

let portfolioData1 = [
    'Portfolio: Infrastructure Reboot',
    'Portfolio: UBC',
    'Portfolio: A',
    'Portfolio: B',
    'Portfolio: XYB',
    'Portfolio: Revamp HR'];

const Portfolio = () =>
    <div className={ portfolio }>
        <h1>Hello Jane</h1>
        <p>{"Here's an overview of your portfolios."}</p>
        <div>
            <Dropdown data={portfolioData1}/>
        </div>
    </div>;

export default Portfolio;
