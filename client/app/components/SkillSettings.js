import React from 'react';
import { setting } from '../styles/setting.scss';
import AddSkillForm from './AddSkillForm';

const SkillSettings = () =>
    <div className={ setting }>
        <h1>Skill Settings</h1>
        <br/>
        <AddSkillForm />
        <br />
    </div>;

export default SkillSettings;
