import React from 'react';
import { resource } from '../styles/resource.scss';
import Table from './Table';
import Button from './Button';
import axios from 'axios/index';
import {Link} from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';
import PopupBox from './PopupBox';
import PopupBoxForDeletion from './PopupBoxForDeletion';

class Resource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numResources: 0,
            rows: [],
            resourceIDs: [],
            managerNames: {},
            assignedResourcesRows: [],
            resourceNames: [],
            successModalOpen: false,
            errorMessage: '',
            errorModalOpen: false,
            projectResourceId: '',
            rowRequests: [],
            requestModalOpen: false,
            requestDecision: ''
        };

        this.getResources = this.getResources.bind(this);
        this.getManagerNames = this.getManagerNames.bind(this);
        this.getRowsForAssignedResourcesTable = this.getRowsForAssignedResourcesTable.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onConfirmRequest = this.onConfirmRequest.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.onCancelDecision = this.onCancelDecision.bind(this);
    }

    componentDidMount() {
        this.getManagerNames();
    }

    onConfirmRequest() {
        const id = this.state.projectResourceId;
        axios.put(prodAPIEndpoint + '/project-resources/' + id, {
            status: this.state.requestDecision
        }).then(response => {
            console.log(response.status);
            if (response.status === 200) {
              this.getResources();
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
        for (let i = 0; i < this.state.resourceIDs.length; i++) {
            axios.get(prodAPIEndpoint + '/project-resources?resourceId=' + this.state.resourceIDs[i], {headers: {Pragma: 'no-cache'}}).then(response => {
                for (let j = 0; j < response.data.length; j++) {
                    axios.get(prodAPIEndpoint + '/projects/' + response.data[j].projectId, {headers: {Pragma: 'no-cache'}}).then(projResponse => {
                        if (response.data[j].status === 'APPROVED') {
                            tableData.push({
                                'ID': projResponse.data.id,
                                'Resources': this.state.resourceNames[i],
                                'Project Name': projResponse.data.name,
                                'Hours': response.data[j].assignedHours
                            });
                            this.setState({ assignedResourcesRows: tableData });
                        }
                        if (response.data[j].status === 'PENDING') {
                            rowRequests.push({
                                 'ID': projResponse.data.id,
                                 'Request ID': response.data[j].id,
                                 'Resource ID': this.state.resourceIDs[i],
                                 'Resource': this.state.resourceNames[i],
                                 'Project Name': projResponse.data.name,
                                 'Hours Requested': response.data[j].assignedHours,
                                 'Approve': <Button
                                                id={response.data[j].id}
                                                type="submit"
                                                value="APPROVED"
                                                label="Approve"
                                                onClick={this.handleRequest} />,
                                'Reject': <Button
                                            id={response.data[j].id}
                                            type="submit"
                                            value="REJECTED"
                                            label="Reject"
                                            onClick={this.handleRequest} />
                            });
                            this.setState({ rowRequests: rowRequests });
                        }
                    }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, requestApprovedModalOpen: false, errorModalOpen: true }); });
                }
            }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
        }
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
            this.setState({ numResources: response.data.length });
            this.setState({ resources: response.data });
            const tableData = [];
            const resourceIDs = [];
            for (let i = 0; i < this.state.numResources; i++) {
                tableData.push({
                    'ID': this.state.resources[i].id,
                    'Resource Name': this.state.resources[i].firstName + ' ' + this.state.resources[i].lastName,
                    'Manager Name': this.state.managerNames[response.data[i].managerId],
                    'Status': this.state.resources[i].status });
                this.state.resourceNames.push(this.state.resources[i].firstName + ' ' + this.state.resources[i].lastName);
                resourceIDs.push(this.state.resources[i].id);
            }
            this.setState({ rows: tableData});
            this.setState({ resourceIDs: resourceIDs});
            this.getRowsForAssignedResourcesTable();
         }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getManagerNames() {
        axios.get(prodAPIEndpoint + '/users', {headers: {Pragma: 'no-cache'}}).then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = response.data[i].firstName + ' ' + response.data[i].lastName;
            }
            this.setState({ managerNames: data });
            this.getResources();
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    onCloseSuccess() {
        this.setState({ successModalOpen: false });
//        this.props.history.push('/resource');
//        window.history.back();
    }

    render() {
        let columns = ['ID', 'Resource Name', 'Manager Name', 'Status'];
        let requestColumns = ['ID', 'Request ID', 'Resource ID', 'Resource', 'Project Name', 'Hours Requested', 'Approve', 'Reject'];
        let assignedResourcesColumns = ['ID', 'Resources', 'Project Name', 'Hours'];
//        const {rows, errorModalOpen, errorMessage, requestApprovedModalOpen, requestRejectedModalOpen} = this.state;
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
                <PopupBoxForDeletion
                    label="Are you sure?"
                    isOpen={requestModalOpen}
                    onClose={this.onConfirmRequest}
                    onCancel={this.onCancelDecision}
                />
                <PopupBoxForDeletion
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
