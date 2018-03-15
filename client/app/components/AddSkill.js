import React from 'react';
import AddExistingSkillForm from './AddExistingSkillForm';
import { addSkill } from '../styles/addSkill.scss';

const AddSkill = () =>
    <div className={ addSkill } >
        <AddExistingSkillForm/>
    </div>;

export default AddSkill;
