import React from 'react';
import Table from './Table.js';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import TextFieldGroup from './TextFieldGroup.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formBox } from '../styles/form.scss';
import { project } from '../styles/project.scss';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';
import PopupBox from './PopupBox';
import PopupBoxTwoButtons from './PopupBoxTwoButtons';
import {RESOURCE, RESOURCE_MANAGER, prodAPIEndpoint } from '../constants/constants';
import { requestSection, title } from '../styles/requestSection.scss';

class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            rowResource: [],
            resourceData: {},
            resources: [],
            resourceId: '',
            assignedHours: '',
            successModalOpen: false,
            errorModalOpen: false,
            projectDeletionModalOpen: false,
            deletionModalOpen: false,
            roles: localStorage.getItem('roles'),
            projectResourceId: '',
            rowRequests: [],
        };

        this.getDetails = this.getDetails.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getResourceData = this.getResourceData.bind(this);
        this.addResource = this.addResource.bind(this);
        this.deleteResourceOrRequest = this.deleteResourceOrRequest.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseProjectDeletion = this.onCloseProjectDeletion.bind(this);
        this.onCloseDeletion = this.onCloseDeletion.bind(this);
        this.onCancelDeletion = this.onCancelDeletion.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getResourceData();
    }

    getDetails() {
        axios.get(prodAPIEndpoint + '/projects/' + this.props.match.params.project_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            axios.get(prodAPIEndpoint + '/users/' + response.data.managerId, {headers: {Pragma: 'no-cache'}}).then(managerRes => {
                axios.get(prodAPIEndpoint + '/portfolios/' + response.data.portfolioId, {headers: {Pragma: 'no-cache'}}).then(portfolioRes => {
                    const managerName = managerRes.data.firstName;
                    const portfolioName = portfolioRes.data.name;
                    const data = response.data;
                    const rows = [
                        {'Header': 'ID', 'Value': data.id},
                        {'Header': 'Portfolio Name', 'Value': portfolioName},
                        {'Header': 'Name', 'Value': data.name},
                        {'Header': 'Project Status', 'Value': sanitizeProjectStatus(data.projectStatus)},
                        {'Header': 'Status', 'Value': sanitizeRagStatus(data.ragStatus)},
                        {'Header': 'Budget ($)', 'Value': data.budget},
                        {'Header': 'Spent To Date ($)', 'Value': data.spentToDate},
                        {'Header': 'Estimate To Complete ($)', 'Value': data.estimateToComplete},
                        {'Header': 'Manager Name', 'Value': managerName},
                        {'Header': 'Complete', 'Value': data.complete ? 'True' : 'False'},
                        {'Header': 'Start Date', 'Value': data.startDate},
                        {'Header': 'End Date', 'Value': data.endDate},
                        {'Header': 'Gantt Chart', 'Value': data.ganttChart}
                    ];
                    this.setState({projectName: response.data.name});
                    this.setState({portfolioId: response.data.portfolioId});
                    this.setState({managerId: response.data.managerId});
                    this.setState({rows: rows});
                });
            });
        })
        .catch( () => {
        });
    }

    handleDeleteProject() {
        this.setState({projectDeletionModalOpen: true});
    }

    deleteProject() {
        const id = this.props.match.params.project_id;
        axios.delete(prodAPIEndpoint + '/projects/' + id)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    projectDeletionModalOpen: false,
                    successModalOpen: true
                });
            }
        }).catch((error) => {
            this.setState({
                errorMessage: 'Error: ' + error.response.data.message,
                projectDeletionModalOpen: false,
                errorModalOpen: true
            });
        });
    }

    getResourceData() {
        axios.get(prodAPIEndpoint + '/users?role=RESOURCE', {headers: {Pragma: 'no-cache'}})
        .then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                // if (response.data[i].status === 'Available' && response.data[i].enabled === true) {
                    data[response.data[i].id] = {'FirstName': response.data[i].firstName, 'LastName': response.data[i].lastName, 'Availability': response.data[i].status};
                // }
            }
            this.setState({resourceData: data});
            this.setState({resources: response.data});
        })
        .then(() => {
            this.getResources();
        });
    }

    getResources() {
        axios.get(prodAPIEndpoint + '/project-resources?projectId=' + this.props.match.params.project_id, {headers: {Pragma: 'no-cache'}})
        .then(response => {
            const tableData = [];
            const rowRequests = [];
            const userMap = this.state.resourceData;
            for (let i = 0; i < response.data.length; i++) {
                const uid = response.data[i].resourceId;
                if (response.data[i].status === 'APPROVED') {
                    tableData.push({
                        'ID': response.data[i].id,
                        'Resource ID': response.data[i].resourceId,
                        'Assigned Hours': response.data[i].assignedHours,
                        'Name': userMap[uid].FirstName + ' ' + userMap[uid].LastName,
                        'Availability': userMap[uid].Availability,
                        'Remove': <Button
                                    id={response.data[i].id}
                                    type="submit"
                                    label="Remove"
                                    onClick={this.handleDelete}
                                />
                    });
                } else {
                    const status = response.data[i].status;
                    rowRequests.push({
                        'ID': response.data[i].id,
                        'Resource ID': response.data[i].resourceId,
                        'Name': userMap[uid].FirstName + ' ' + userMap[uid].LastName,
                        'Hours': response.data[i].assignedHours,
                        'Availability': userMap[uid].Availability,
                        'Status': status,
                        'Remove': <Button
                                    id={response.data[i].id}
                                    type="submit"
                                    label="Remove"
                                    onClick={this.handleDelete}
                                />
                    });
                }
            }
            this.setState({rowResource: tableData});
            this.setState({rowRequests: rowRequests});
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addResource() {
        axios.post(prodAPIEndpoint + '/project-resources', {
            projectId: this.props.match.params.project_id,
            resourceId: this.state.resourceId,
            assignedHours: this.state.assignedHours,
            status: 'PENDING'
        })
        .then(response => {
            if (response.status === 201) {
              this.getResourceData();
              this.setState({ successModalOpen: true });
            }
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    handleDelete(e) {
        this.setState({
            deletionModalOpen: true,
            projectResourceId: e.target.name
        });
    }

    onCloseDeletion() {
        this.deleteResourceOrRequest();
    }

    handleDelete(e) {
        this.setState({
            deletionModalOpen: true,
            projectResourceId: e.target.name
        });
    }

    deleteResourceOrRequest() {
        const id = this.state.projectResourceId;
        axios.delete(prodAPIEndpoint + '/project-resources/' + id)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    deletionModalOpen: false,
                    successModalOpen: true
                });
            }
        }).catch((error) => {
            this.setState({
                errorMessage: 'Error: ' + error.response.data.message,
                deletionModalOpen: false,
                errorModalOpen: true
            });
        });
    }

    onCloseSuccess() {
        this.getResources();
        this.setState({ successModalOpen: false });
    }

    onCloseProjectDeletion() {
        this.deleteProject();
    }

    onCancelDeletion() {
        this.setState({
            projectDeletionModalOpen: false,
            deletionModalOpen: false,
            errorMessage: 'deletion has been canceled',
            errorModalOpen: true
        });
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        let columns = ['Header', 'Value'];
        let resourceColumns = ['ID', 'Resource ID', 'Name', 'Assigned Hours', 'Availability', 'Remove'];
        let requestColumns = ['ID', 'Resource ID', 'Name', 'Hours', 'Availability', 'Status', 'Remove'];

        const data = this.state.rows;
        const data2 = {'managerId': this.state.managerId, 'portfolioId': this.state.portfolioId, 'projectName': this.state.projectName};
        const {resourceId, assignedHours, projectDeletionModalOpen, deletionModalOpen, successModalOpen, errorModalOpen, errorMessage} = this.state;
        const resourceObjects = this.state.resources.map(ro => {
            return { id: ro.id, name: ro.firstName };
        });
        if (this.state.roles.split(',').includes(RESOURCE) || this.state.roles.includes(RESOURCE_MANAGER)) {
            return (
                <div className={ project }>
                    <h1>{this.state.projectName}</h1>
                    <h2>Project Details</h2>
                    <Table text="Project Details" columns={columns} rows={this.state.rows}/>
                    <PopupBox
                        label={errorMessage}
                        isOpen={errorModalOpen}
                        onClose={this.onCloseError}
                    />
                </div>
            );
        }
        return (
            <div className={ project }>
                <h1>{this.state.projectName}</h1>
                <h2>Project Details</h2>
                <Table text="Project Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/project/edit', state: {data}, state2: {data2}}}>
                        <Button type="submit" label="Edit"/>
                    </Link>
                </span>
                <PopupBoxTwoButtons
                    label="Are you sure?"
                    isOpen={projectDeletionModalOpen}
                    onClose={this.onCloseProjectDeletion}
                    onCancel={this.onCancelDeletion}
                />
                <PopupBox
                    label="Successful!"
                    isOpen={successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <Button type="submit" label="Delete" onClick={this.handleDeleteProject}/>

                <h2>Resources</h2>
                <PopupBoxTwoButtons
                    label="Are you sure?"
                    isOpen={deletionModalOpen}
                    onClose={this.onCloseDeletion}
                    onCancel={this.onCancelDeletion}
                />
                {this.state.rowResource.length > 0 &&
                    <Table text="Project Details Resources" columns={resourceColumns} rows={this.state.rowResource}/>}
                {this.state.rowResource.length === 0 && <p>No resources are assigned under this project.</p>}

                <h2>Resource Requests</h2>
                {this.state.rowRequests.length > 0 &&
                    <Table text="Project Details Resource Request" columns={requestColumns} rows={this.state.rowRequests}/>}
                {this.state.rowRequests.length === 0 && <p>No requests or none are kept in history.</p>}

                <div className={requestSection} >
                    <div className={title}><h2>Request Resources</h2></div>
                    <h6>NOTE: Before requesting a resource who is already in your <i>Resources</i> table,<br/>
                    <i>remove</i> them from that table first, then request them here.</h6>
                    <div className={ formBox }>
                        <Dropdown
                            label="Available Resources"
                            name="resourceId"
                            data={resourceObjects}
                            preSelect={resourceId}
                            onSelect={this.onChange}
                        />
                        <TextFieldGroup
                            type="text"
                            field="assignedHours"
                            label="Number of Hours"
                            value={assignedHours}
                            onChange={this.onChange}
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Add Resource"
                        onClick={this.addResource}
                    />
                </div>
            </div>
        );
    }

}

ProjectDetail.propTypes = {
    match: React.PropTypes.any,
    history: React.PropTypes.any,
};

export default ProjectDetail;
