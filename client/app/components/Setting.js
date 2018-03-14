import React from 'react';
import { setting } from '../styles/setting.scss';
import AddUserForm from './AddUserForm';
import AddSkillCategoryForm from './AddSkillCategoryForm';
import AddClassificationForm from './AddClassificationForm';
import AddSkillTypeForm from './AddSkillTypeForm';
import AddUserRoleForm from './AddUserRoleForm';

const Setting = () =>
    <div className={ setting }>
        <h1>My Setting</h1>
        <br/>
        <AddUserForm />
        <br/>
        <AddSkillCategoryForm />
        <br/>
        <AddSkillTypeForm />
        <br/>
        <AddClassificationForm />
        <br/>
        <AddUserRoleForm/>
        <br />
    </div>;

export default Setting;
