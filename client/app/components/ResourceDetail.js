import React from 'react';
import Table from './Table.js';
import { resource } from '../styles/resource.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './Button.js';
import { skill } from '../styles/skill.scss';

class ResourceDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            rows: [],
            skillsRows: [],
            userSkillIds: [],
            skillTypeData: {},
            skillCategoryData: {},
            tableHeaders: {}
        };

        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getSkillCategories();
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
            this.setState({fullName: data.firstName + ' ' + data.lastName});
        }).catch( () => {
        });
    }

    getSkillCategories() {
         axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories', {headers: {Pragma: 'no-cache'}}).then( (response) => {
             this.setState({ skillCategoryData: response.data });
             this.getSkillTypes();
         });
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types', {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ skillTypeData: response.data });
            this.getUserSkills();
        });
    }

    getUserSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.props.match.params.resource_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            const data = response.data;
            const numSkill = response.data.length;
            const skillsRows = [];
            for (let i = 0; i < numSkill; i++) {
                for(let j = 0; j < this.state.skillTypeData.length; j++) {
                    if (this.state.skillTypeData[j].id === data[i].skillTypeId) {
                        for(let k = 0; k < this.state.skillCategoryData.length; k++) {
                            if (this.state.skillCategoryData[k].id === this.state.skillTypeData[j].skillCategoryId) {
                                this.state.userSkillIds.push(data[i].id);
                                skillsRows.push({
                                    'Skill Category': this.state.skillCategoryData[k].name,
                                    'Skill Name': this.state.skillTypeData[j].name,
                                    'Skill Competency': data[i].competency
                                });
                            }
                        }
                    }
                }
            }
            this.setState({ skillsRows: skillsRows});
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
        let skillsColumns = ['Skill Category', 'Skill Name', 'Skill Competency'];
        const data = this.state.rows;
        const skillsData = this.state.skillsRows;
        const skillIdsData = this.state.userSkillIds;

        return (
            <div>
                <div className={ resource }>
                    <h1>{this.state.fullName}</h1>
                    <h1>Resource Details</h1>
                    <Table text="Resource Details" columns={columns} rows={this.state.rows}/>
                    <span>
                        <Link to={{pathname: '/resource/edit', state: {data}}}>
                            <Button label="Edit"/>
                        </Link>
                    </span>
                </div>
                <div className={ skill }>
                    <h1>Skills</h1>
                    <Table text="Resource Skills" columns={skillsColumns} rows={skillsData} />
                    <div>
                        <Link to = {{pathname: '/skill/add', state: {data}}}>
                            <Button
                                type="submit"
                                label="Add Skill"
                            />
                        </Link>
                        <Link to = {{pathname: '/skill/edit', state: {skillsData, skillIdsData, data}}}>
                            <Button
                                type="submit"
                                label="Edit Skills"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

ResourceDetail.propTypes = {
    match: React.PropTypes.any
};

export default ResourceDetail;
