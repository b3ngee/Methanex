import React from 'react';
import { addSkill } from '../styles/addSkill.scss';
import AddSkillForm from './AddSkillForm';

const AddSkill = () =>
    <div className={ addSkill }>
        <h2>Add new skill</h2>
        <AddSkillForm/>
    </div>;

export default AddSkill;
