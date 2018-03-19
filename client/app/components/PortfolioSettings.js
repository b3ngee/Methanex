import React from 'react';
import { setting } from '../styles/setting.scss';
import AddClassificationForm from './AddClassificationForm';
import DeleteClassificationForm from './DeleteClassificationForm';

const PortfolioSettings = () =>
    <div className={ setting }>
        <h1>Portfolio Settings</h1>
        <br/>
        <AddClassificationForm />
        <br />
        <DeleteClassificationForm />
        <br/>
    </div>;

export default PortfolioSettings;
