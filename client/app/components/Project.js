import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { RESOURCE, SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';
import { sanitizeProjectStatus, sanitizeRagStatus, sanitizeBudget } from '../utils/sanitizer';
import PopupBox from './PopupBox';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProject: 0,
            selectedProjectID: 0,
            rows: [],
            userId: localStorage.getItem('user_id'),
            roles: localStorage.getItem('roles'),
            assignedProjectsRows: [],
            errorModalOpen: false
        };
        this.getProjects = this.getProjects.bind(this);
        this.getRowsForAssignedProjectsTable = this.getRowsForAssignedProjectsTable.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        if(this.state.roles.split(',').includes(RESOURCE)) {
            this.getRowsForAssignedProjectsTable();
        } else {
            this.getProjects();
        }
    }

    getRowsForAssignedProjectsTable() {
        const tableData = [];
        axios.get(prodAPIEndpoint + '/project-resources?resourceId=' + this.state.userId, {headers: {Pragma: 'no-cache'}}).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                axios.get(prodAPIEndpoint + '/projects/' + response.data[i].projectId, {headers: {Pragma: 'no-cache'}}).then(projResponse => {
                    axios.get(prodAPIEndpoint + '/users/' + projResponse.data.managerId, {headers: {Pragma: 'no-cache'}}).then(userResponse => {
                        tableData.push({
                            'ID': projResponse.data.id,
                            'Project Name': projResponse.data.name,
                            'Project Manager Names': userResponse.data.firstName + ' ' + userResponse.data.lastName,
                            'Hours': response.data[i].assignedHours
                        });
                        this.setState({ assignedProjectsRows: tableData });
                    }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
                }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
            }
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getProjects() {
        const isAdmin = this.state.roles.includes(SUPER_ADMIN);
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
                tableData.push({
                    'ID': this.state.projects[i].id,
                    'Project ID': this.state.projects[i].id,
                    'Project Name': this.state.projects[i].name,
                    'Project Status': sanitizeProjectStatus(this.state.projects[i].projectStatus),
                    'Status': sanitizeRagStatus(this.state.projects[i].ragStatus),
                    'Budget': sanitizeBudget(this.state.projects[i].budget) });
            }
            this.setState({ rows: tableData});
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        let columns = ['ID', 'Project ID', 'Project Name', 'Project Status', 'Status', 'Budget'];
        const rows = this.state.rows;
        let assignedProjectsColumns = ['ID', 'Project Name', 'Project Manager Names', 'Hours'];
        const {errorModalOpen, errorMessage} = this.state;
        if (this.state.roles.split(',').includes(RESOURCE)) {
            return (
                <div className={ project }>
                    <h3>Assigned Projects</h3>
                    <PopupBox
                        label={errorMessage}
                        isOpen={errorModalOpen}
                        onClose={this.onCloseError}
                    />
                    <Table text="List of Assigned Projects" columns={assignedProjectsColumns} rows={this.state.assignedProjectsRows}/>
                </div>
            );
        }
        return(
            <div className={ project }>
                <h1>My Projects</h1>
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <h3>Number of projects: {this.state.rows.length}</h3>
                <p>Click on portfolio name to see more details</p>
                <Table text="List of Projects" columns={columns} rows={rows}/>
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
