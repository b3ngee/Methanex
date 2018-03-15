import React from 'react';
import { setting } from '../styles/setting.scss';
import AddUserForm from './AddUserForm';
import AddSkillForm from './AddSkillForm';
import AddClassificationForm from './AddClassificationForm';
import AddSkillTypeForm from './AddSkillTypeForm';
import AddUserRoleForm from './AddUserRoleForm';

const Setting = () =>
    <div className={ setting }>
        <h1>My Setting</h1>
        <br/>
        <AddUserForm />
        <br/>
        <AddSkillForm />
        <br/>
        <AddClassificationForm />
        <br/>
        <AddUserRoleForm/>
        <br />
    </div>;

export default Setting;
