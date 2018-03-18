import React from 'react';
import { setting } from '../styles/setting.scss';
import Button from './Button';
import { Link } from 'react-router-dom';

const Setting = () =>
    <div className={ setting }>
        <h1>My Settings</h1>

        <label>Access User Settings</label>
        <br/>
        <span>
            <Link to={{pathname: 'setting/user'}}>
                <Button
                    type="text"
                    label="User Settings"
                />
            </Link>
        </span>
        <br/>
        <label>Access Skill Settings</label>
        <br/>
        <span>
            <Link to={{pathname: 'setting/skill'}}>
                <Button
                    type="text"
                    label="Skill Settings"
                />
            </Link>
        </span>
        <br/>
        <label>Access Portfolio Settings</label>
        <br/>
        <span>
            <Link to={{pathname: 'setting/portfolio'}}>
                <Button
                    type="text"
                    label="Portfolio Settings"
                />
            </Link>
        </span>
    </div>;

export default Setting;
