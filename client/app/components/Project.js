import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProject: 0,
            selectedProjectID: 0,
            rows: []
        };
        this.getProjects = this.getProjects.bind(this);
    }

    componentDidMount() {
        this.getProjects();
    }

    sanitizeProjectStatus(status) {
        switch(status) {
            case 'PIPELINE':
                return 'Pipeline';
            case 'PRE_APPROVAL':
                return 'Pre Approval';
            case 'SEEKING_FUNDING':
                return 'Seeking Funding';
            case 'ON_HOLD':
                return 'On Hold';
            case 'UNDERWAY':
                return 'Underway';
            case 'STOPPED':
                return 'Stopped';
            default:
                return status;
        }
    }

    sanitizeRagStatus(status) {
        switch(status) {
            case 'RED':
                return 'Red';
            case 'AMBER':
                return 'Amber';
            case 'Green':
                return 'Green';
            default:
                return status;
        }
    }

    getProjects() {
        const roles = localStorage.getItem('roles');
        const isAdmin = roles.includes(SUPER_ADMIN);
        let query;
        if (isAdmin) {
            query = '/projects';
        } else {
            query = '/projects?managerId=' + localStorage.user_id;
        }
        axios.get(prodAPIEndpoint + query).then(response => {
            this.setState({ numProject: response.data.length });
            this.setState({ projects: response.data });

            const tableData = [];
            for (let i = 0; i < this.state.numProject; i++) {
                tableData.push({ 'ID': this.state.projects[i].id, 'Project Name': this.state.projects[i].name, 'Project Status': this.sanitizeProjectStatus(this.state.projects[i].projectStatus), 'Status': this.sanitizeRagStatus(this.state.projects[i].ragStatus), 'Budget': this.state.projects[i].budget });
            }
            this.setState({ rows: tableData});
        }).catch( () => {
        });
    }

    render() {
        let columns = ['ID', 'Project Name', 'Project Status', 'Status', 'Budget'];
        const rows = this.state.rows;
        return(
            <div className={ project }>
                <h1>My Projects</h1>
                <Table text="List of Projects" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/project/report', state: {c: {columns}, r: {rows}}}}>
                        <Button
                            type="text"
                            label="Create Report"
                        />
                    </Link>
                </span>
                <span>
                    <Link to={{pathname: 'project/add'}}>
                        <Button
                            type="text"
                            label="Add New Project"
                        />
                    </Link>
                </span>
            </div>
        );
    }
}

export default Project;
