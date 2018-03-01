import React from 'react';
import { addSkillPage } from '../styles/addSkillPage.scss';
import AddSkillForm from './AddSkillForm';

const AddSkillPage = () =>
    <div className={ addSkillPage }>
        <h2>Add new skill</h2>
        <AddSkillForm/>
    </div>;

export default AddSkillPage;
