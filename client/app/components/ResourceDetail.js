import React from 'react';
import Table from './Table.js';
import { resource } from '../styles/resource.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './Button.js';

class ResourceDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            skillsRows: [],
            skillsNames: {},
            tableHeaders: {}
        };

        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getSkillsNames();
        this.sanitizeTableHeaders();
    }

    // TODO: need to fix up the apiary call
    getDetails() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users/' + this.props.match.params.resource_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            const rows = [];
            const data = response.data;
            for (const key in data) {
                if(key !== null && typeof data[key] === 'boolean') {
                    rows.push({'Header': this.state.tableHeaders[key], 'Value': data[key] + ''});
                } else if (key !== null) {
                    rows.push({'Header': this.state.tableHeaders[key], 'Value': data[key]});
                }
            }
            this.setState({rows: rows});
        }).catch( () => {
        });
    }

    getUserSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.props.match.params.resource_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            const skillsRows = [];
            const data = response.data;

            for (let i = 0; i < response.data.length; i++) {
                skillsRows.push({ 'Skill': this.state.skillsNames[data[i].skillTypeId], 'Competency': data[i].competency });
            }
            this.setState({skillsRows: skillsRows});
        }).catch( () => {
        });
    }

    getSkillsNames() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types', {headers: {Pragma: 'no-cache'}}).then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = response.data[i].name;
            }
            this.setState({ skillsNames: data });
            this.getUserSkills();
        }).catch( () => {
        });
    }

    sanitizeTableHeaders() {
        const tableHeaders = {
            id: 'ID',
            managerId: 'Manager ID',
            firstName: 'First Name',
            lastName: 'Last Name',
            address: 'Address',
            email: 'Email',
            location: 'Location',
            status: 'Status',
            enabled: 'Enabled'
        };
        this.setState({ tableHeaders: tableHeaders});
    }

    render() {
        let columns = ['Header', 'Value'];
        let skillsColumns = ['Skill', 'Competency'];
        const data = this.state.rows;
        return (
            <div className={ resource }>
                <h1>Resource Details</h1>
                <Table text="Resource Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/resource/edit', state: {data}}}>
                        <Button label="Edit"/>
                    </Link>
                </span>
                <Table text="Resource Skills" columns={skillsColumns} rows={this.state.skillsRows} />
                <Link to = {{pathname: '/addSkill', state: {data}}}>
                    <Button
                        type="submit"
                        label="Add Skill"
                    />
                </Link>
                <Link to = "/">
                    <Button
                        type="submit"
                        label="Edit Skill"
                    />
                </Link>
                <Link to = "/">
                    <Button
                        type="submit"
                        label="Delete Skill"
                    />
                </Link>
            </div>
        );
    }

}

ResourceDetail.propTypes = {
    match: React.PropTypes.any
};

export default ResourceDetail;
