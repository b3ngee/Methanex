import React from 'react';
import { setting } from '../styles/setting.scss';
import AddSkillForm from './AddSkillForm';
import DeleteSkillCategoryForm from './DeleteSkillCategoryForm';
import DeleteSkillType from './DeleteSkillType';

const SkillSettings = () =>
    <div className={ setting }>
        <h1>Skill Settings</h1>
        <br/>
        <AddSkillForm />
        <br />
        <DeleteSkillCategoryForm />
        <br />
        <DeleteSkillType />
    </div>;

export default SkillSettings;
