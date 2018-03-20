import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';

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

    getProjects() {
        const roles = localStorage.getItem('roles');
        const isAdmin = roles.includes(SUPER_ADMIN);
        let query;
        if (isAdmin) {
            query = '/projects';
        } else {
            query = '/projects?managerId=' + localStorage.user_id;
        }
        axios.get(prodAPIEndpoint + query, {headers: {Pragma: 'no-cache'}}).then(response => {
            this.setState({ numProject: response.data.length });
            this.setState({ projects: response.data });

            const tableData = [];
            for (let i = 0; i < this.state.numProject; i++) {
                tableData.push({ 'ID': this.state.projects[i].id, 'Project Name': this.state.projects[i].name, 'Project Status': sanitizeProjectStatus(this.state.projects[i].projectStatus), 'Status': sanitizeRagStatus(this.state.projects[i].ragStatus), 'Budget': this.state.projects[i].budget });
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
                <h3>Number of projects: {this.state.rows.length}</h3>
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
