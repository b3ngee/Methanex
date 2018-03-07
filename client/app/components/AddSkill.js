import React from 'react';
import AddSkillForm from './AddSkillForm';
import { addSkill } from '../styles/addSkill.scss';

const AddSkill = () =>
    <div className={ addSkill } >
        <AddSkillForm/>
    </div>;

export default AddSkill;
