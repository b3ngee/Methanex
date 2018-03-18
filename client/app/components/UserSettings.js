import React from 'react';
import { setting } from '../styles/setting.scss';
import AddUserForm from './AddUserForm';
import AddUserRoleForm from './AddUserRoleForm';

const UserSettings = () =>
    <div className={ setting }>
        <h1>User Settings</h1>
        <br/>
        <AddUserForm />
        <br/>
        <AddUserRoleForm/>
        <br />
    </div>;

export default UserSettings;
