import React from 'react';
import { setting } from '../styles/setting.scss';
import AddUserForm from './AddUserForm';
import AddSkillCategoryForm from './AddSkillCategoryForm';

const Setting = () =>
    <div className={ setting }>
        <h1>My Setting</h1>
        <br/>
        <AddUserForm />
        <br/>
        <AddSkillCategoryForm />
        <br/>
    </div>;

export default Setting;
