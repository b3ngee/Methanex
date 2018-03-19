import React from 'react';
import { setting } from '../styles/setting.scss';
import AddSkillForm from './AddSkillForm';
import DeleteSkillCategoryForm from './DeleteSkillCategoryForm';
import DeleteSkillType from './DeleteSkillType';
import EditSkillCategory from './EditSkillCategory';
import EditSkillType from './EditSkillType';

const SkillSettings = () =>
    <div className={ setting }>
        <h1>Skill Settings</h1>
        <br />
        <AddSkillForm />
        <br />
        <DeleteSkillCategoryForm />
        <br />
        <DeleteSkillType />
        <br />
        <EditSkillCategory />
        <br />
        <EditSkillType />
    </div>;

export default SkillSettings;
