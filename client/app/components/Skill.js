import React from 'react';
import { skill } from '../styles/skill.scss';

import Dropdown from './Dropdown.js';


let skillData = [
    'SQL 11 .x',
    'Node.JS',
    'Cisco IOS',
    'version3',
    'Phython',
    'Java',
    'Project',
    'Management'];

const Home = () =>
    <div className={ skill }>
        <h1>Hello Jane</h1>
            <p>{"Here's an overview of your skills."}</p>
            <div>
                <Dropdown data={skillData}/>
            </div>
    </div>;

export default Home;
