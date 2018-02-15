import React from 'react';
import { setting } from '../styles/setting.scss';
import AddUserForm from './AddUserForm';

const Setting = () =>
    <div className={ setting }>
        <h1>My Setting</h1>
        <br/>
        <h2>Add new user</h2>
        <AddUserForm/>
    </div>;

export default Setting;
