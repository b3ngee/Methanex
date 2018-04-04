import React from 'react';
import { resource } from '../styles/resource.scss';
import Table from './Table';
import Button from './Button';
import axios from 'axios/index';
import {Link} from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';
import PopupBox from './PopupBox';
import PopupBoxTwoButtons from './PopupBoxTwoButtons';

class Resource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
//            managerNames: {}, // todo: all the todo in this file is about whether or not to show the manager name on the My Resources table.
            assignedResourcesRows: [],
            successModalOpen: false,
            errorMessage: '',
            errorModalOpen: false,
            projectResourceId: '',
            rowRequests: [],
            requestModalOpen: false,
            requestDecision: ''
        };

        this.getResources = this.getResources.bind(this);
//        this.getManagerNames = this.getManagerNames.bind(this); // todo
        this.getRowsForAssignedResourcesTable = this.getRowsForAssignedResourcesTable.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onConfirmRequest = this.onConfirmRequest.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.onCancelDecision = this.onCancelDecision.bind(this);
    }

    componentDidMount() {
//        this.getManagerNames(); // todo
        this.getResources();
    }

    onConfirmRequest() {
        const id = this.state.projectResourceId;
        axios.put(prodAPIEndpoint + '/project-resources/' + id, {
            status: this.state.requestDecision
        }).then(response => {
            if (response.status === 200) {
              this.setState({
                requestModalOpen: false,
                successModalOpen: true
              });
            }
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, requestModalOpen: false, errorModalOpen: true }); });
    }

    handleRequest(e) {
        this.setState({
            requestModalOpen: true,
            projectResourceId: e.target.name,
            requestDecision: e.target.value
        });
    }

    onCancelDecision() {
        this.setState({
            requestModalOpen: false,
            errorMessage: 'canceled',
            errorModalOpen: true
         });
     }

    getRowsForAssignedResourcesTable() {
        const tableData = [];
        const rowRequests = [];
        axios.get(prodAPIEndpoint + '/project-resources', {headers: {Pragma: 'no-cache'}}).then(prResponse => {
            this.setState({ prData: prResponse.data });
            axios.get(prodAPIEndpoint + '/projects/', {headers: {Pragma: 'no-cache'}}).then(projectsResponse => {
            this.setState({ projects: projectsResponse.data });
            for (let i = 0; i < this.state.resources.length; i++) {
                for (let j = 0; j < this.state.prData.length; j++) {
                    if (this.state.prData[j].resourceId === this.state.resources[i].id) {
                        for (let k = 0; k < this.state.projects.length; k++) {
                            if (this.state.prData[j].projectId === this.state.projects[k].id) {
                                if (this.state.prData[j].status === 'APPROVED') {
                                    tableData.push({
                                        'ID': this.state.projects[k].id, // hidden
                                        'Request ID': this.state.prData[j].id, // for debugging; remove later
                                        'Resource': this.state.resources[i].firstName + ' ' + this.state.resources[i].lastName,
                                        'Resource ID': this.state.resources[i].id, // for debugging; can be removed later
                                        'Project Name': this.state.projects[k].name,
                                        'Hours Assigned': this.state.prData[j].assignedHours
                                    });
                                }
                                if (this.state.prData[j].status === 'PENDING') {
                                    rowRequests.push({
                                         'ID': this.state.projects[k].id, // hidden
                                         'Request ID': this.state.prData[j].id,
                                         'Resource': this.state.resources[i].firstName + ' ' + this.state.resources[i].lastName,
                                         'Resource ID': this.state.resources[i].id,
                                         'Project Name': this.state.projects[k].name,
                                         'Hours Requested': this.state.prData[j].assignedHours,
                                         'Availability': this.state.resources[i].status,
                                         'Approve': <Button
                                                        id={this.state.prData[j].id}
                                                        type="submit"
                                                        value="APPROVED"
                                                        label="Approve"
                                                        onClick={this.handleRequest} />,
                                        'Reject': <Button
                                                    id={this.state.prData[j].id}
                                                    type="submit"
                                                    value="REJECTED"
                                                    label="Reject"
                                                    onClick={this.handleRequest} />
                                    });
                                }
                                this.setState({ assignedResourcesRows: tableData });
                                this.setState({ rowRequests: rowRequests });
                            }
                        }
                    }
                }
            } }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, requestApprovedModalOpen: false, errorModalOpen: true }); });
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getResources() {
        const roles = localStorage.getItem('roles');
        const isAdmin = roles.includes(SUPER_ADMIN);
        let query;
        if (isAdmin) {
            query = '/users';
        } else {
            query = '/users?managerId=' + localStorage.user_id;
        }
        axios.get(prodAPIEndpoint + query, {headers: {Pragma: 'no-cache'}}).then(response => {
            this.setState({ resources: response.data });
            const tableData = [];
            for (let i = 0; i < response.data.length; i++) {
                tableData.push({
                    'ID': this.state.resources[i].id, // hidden
                    'Resource Name': this.state.resources[i].firstName + ' ' + this.state.resources[i].lastName,
                    'Resource ID': this.state.resources[i].id, // for debugging; can be removed later
//                    'Manager Name': this.state.managerNames[response.data[i].managerId], // todo: manager name is always the user's name so maybe not necessary
                    'Availability': this.state.resources[i].status });
            }
            this.setState({ rows: tableData});
            this.getRowsForAssignedResourcesTable();
         }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

// todo
//    getManagerNames() {
//        axios.get(prodAPIEndpoint + '/users', {headers: {Pragma: 'no-cache'}}).then(response => {
//            const data = {};
//            for (let i = 0; i < response.data.length; i++) {
//                data[response.data[i].id] = response.data[i].firstName + ' ' + response.data[i].lastName;
//            }
//            this.setState({ managerNames: data });
//            this.getResources();
//        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
//    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    onCloseSuccess() {
        this.getRowsForAssignedResourcesTable();
        this.setState({ successModalOpen: false });
    }

    render() {
        let columns = ['ID', 'Resource Name', 'Resource ID', 'Availability'];
//        let columns = ['ID', 'Resource Name', 'Resource ID', 'Manager Name', 'Availability']; // todo: can be put back if manager name is preferred to be shown
        let requestColumns = ['ID', 'Request ID', 'Resource', 'Resource ID', 'Project Name', 'Hours Requested', 'Availability', 'Approve', 'Reject'];
        let assignedResourcesColumns = ['ID', '(request) ID', 'Resource', 'Resource ID', 'Project Name', 'Hours Assigned'];
        const {rows, successModalOpen, errorModalOpen, errorMessage, requestModalOpen} = this.state;
        return(
            <div className={ resource }>
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <h1>My Resources</h1>
                <h3>Number of resources: {this.state.rows.length} </h3>
                <Table text="List of Resources" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/resource/report', state: {c: {columns}, r: {rows}}}}>
                        <Button
                            type="submit"
                            label="Create report"
                        />
                    </Link>
                </span>
                <h3>Assigned Resources</h3>
                {this.state.assignedResourcesRows.length > 0 &&
                    <Table text="List of Assigned Resources" columns={assignedResourcesColumns} rows={this.state.assignedResourcesRows}/>}
                {this.state.assignedResourcesRows.length === 0 && <p>None of your resources are assigned.</p>}

                <h2>Resource Requests</h2>
                <PopupBox
                    label="Successful!"
                    isOpen={successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <PopupBoxTwoButtons
                    label="Are you sure?"
                    isOpen={requestModalOpen}
                    onClose={this.onConfirmRequest}
                    onCancel={this.onCancelDecision}
                />
                {this.state.rowRequests.length > 0 &&
                    <Table text="Resource Requests" columns={requestColumns} rows={this.state.rowRequests}/>}
                {this.state.rowRequests.length === 0 && <p>No requests.</p>}
            </div>
        );
    }
}

Resource.propTypes = {
    match: React.PropTypes.any,
    history: React.PropTypes.any,
};

export default Resource;
