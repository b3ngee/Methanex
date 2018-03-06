import React from 'react';
import axios from 'axios/index';
import VerticalTable from './VerticalTable.js';
import { profile } from '../styles/profile.scss';

const headings = ['Email', 'Roles', 'Skills'];

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };
        this.getUserSkills = this.getUserSkills.bind(this);
    }

    componentDidMount() {
        this.getUserSkills();
    }

    getUserSkills() {
        axios.get('https://private-3bb33-methanex.apiary-mock.com/skills?resourceId=1')
            .then(res => {
                this.setState({ skills: res.data });
            }).catch(
            // TODO: display error message once api format is finalized
            );
    }

    render() {
        const skills = this.state.skills.join(', ');
        const data = [
            localStorage.getItem('email'),
            localStorage.getItem('roles'),
            skills
        ];
        return (
            <div>
                <div className={ profile }>
                    <p> Hello {localStorage.getItem('user_name')}! </p>
                </div>
                <VerticalTable headings={headings} data={data} />
            </div>
        );
    }

}

export default Profile;
