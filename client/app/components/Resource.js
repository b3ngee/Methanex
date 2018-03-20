import React from 'react';
import { resource } from '../styles/resource.scss';
import Table from './Table.js';
import axios from 'axios/index';
import {Link} from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';

class Resource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numResources: 0,
            rows: [],
            resourceIDs: [],
            managerNames: {}
        };

        this.getResources = this.getResources.bind(this);
        this.getManagerNames = this.getManagerNames.bind(this);
    }

    componentDidMount() {
        this.getManagerNames();
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
                resourceIDs.push(this.state.resources[i].resource_id);
            }
            this.setState({ rows: tableData});
            this.setState({ resourceIDs: resourceIDs});
        }).catch( () => {

        });
    }

    getManagerNames() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users', {headers: {Pragma: 'no-cache'}}).then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = response.data[i].firstName + ' ' + response.data[i].lastName;
            }
            console.log(data);
            this.setState({ managerNames: data });
            this.getResources();
        }).catch( () => {
        });
    }

    render() {
        let columns = ['ID', 'Resource Name', 'Manager ID', 'Status'];
        const rows = this.state.rows;
        return(
            <div className={ resource }>
                <h1>My Resources</h1>
                <Table text="List of Resources" columns={columns} rows={this.state.rows} ids={this.state.resourceIDs}/>
                <span>
                    <Link to={{pathname: '/resource/report', state: {c: {columns}, r: {rows}}}}>
                        <button>Create report</button>
                    </Link>
                </span>
            </div>
        );
    }

}

export default Resource;
