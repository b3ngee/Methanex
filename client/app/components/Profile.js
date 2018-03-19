import React from 'react';
// import axios from 'axios/index';
import VerticalTable from './VerticalTable.js';
import { profile } from '../styles/profile.scss';
import Skill from './Skill';

const headings = ['Email', 'Role(s)'];

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };
        // this.getUserSkills = this.getUserSkills.bind(this);
    }

    render() {
        const data = [
            localStorage.getItem('email'),
            localStorage.getItem('roles'),
        ];
        return (
            <div>
                <div className={ profile }>
                    <p> Hello {localStorage.getItem('user_name')}! </p>
                </div>
                <VerticalTable headings={headings} data={data} />
                <Skill />
            </div>
        );
    }

}

export default Profile;
