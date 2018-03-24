import React from 'react';
import { resource } from '../styles/resource.scss';
import Table from './Table.js';
import axios from 'axios/index';
import {Link} from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';
import PopupBox from './PopupBox';

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
            errorModalOpen: false
        };

        this.getResources = this.getResources.bind(this);
        this.getManagerNames = this.getManagerNames.bind(this);
        this.getRowsForAssignedResourcesTable = this.getRowsForAssignedResourcesTable.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getManagerNames();
    }

    getRowsForAssignedResourcesTable() {
        const tableData = [];
        for (let i = 0; i < this.state.resourceIDs.length; i++) {
            axios.get(prodAPIEndpoint + '/project-resources?resourceId=' + this.state.resourceIDs[i], {headers: {Pragma: 'no-cache'}}).then(response => {
                for (let j = 0; j < response.data.length; j++) {
                    axios.get(prodAPIEndpoint + '/projects/' + response.data[j].projectId, {headers: {Pragma: 'no-cache'}}).then(projResponse => {
                        tableData.push({
                            'Project ID': projResponse.data.id,
                            'Resources': this.state.resourceNames[i],
                            'Project Name': projResponse.data.name,
                            'Hours': response.data[j].assignedHours
                        });
                        this.setState({ assignedResourcesRows: tableData });
                    }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
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
                tableData.push({ 'ID': this.state.resources[i].id, 'Resource Name': this.state.resources[i].firstName + ' ' + this.state.resources[i].lastName, 'Manager ID': this.state.managerNames[response.data[i].managerId], 'Status': this.state.resources[i].status });
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

    render() {
        let columns = ['ID', 'Resource Name', 'Manager ID', 'Status'];
        let assignedResourcesColumns = ['Project ID', 'Resources', 'Project Name', 'Hours'];
        const {rows, errorModalOpen, errorMessage} = this.state;
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
                        <button>Create report</button>
                    </Link>
                </span>
                <h3>Assigned Resources</h3>
                <Table text="List of Assigned Resources" columns={assignedResourcesColumns} rows={this.state.assignedResourcesRows}/>
            </div>
        );
    }
}

export default Resource;
