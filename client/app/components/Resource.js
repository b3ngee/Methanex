import React from 'react';
import { resource } from '../styles/resource.scss';
import Table from './Table.js';
import axios from 'axios/index';
import {Link} from 'react-router-dom';

class Resource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numResources: 0,
            rows: [],
            resourceIDs: []
        };

        this.getResources = this.getResources.bind(this);
    }

    componentDidMount() {
        this.getResources();
    }

    // TODO: need to change the end points
    getResources() {
        axios.get('https://private-05c14-methanex.apiary-mock.com/resources?managerId=').then(response => {
            this.setState({ numResources: response.data.length });
            this.setState({ resources: response.data });

            const tableData = [];
            const resourceIDs = [];
            for (let i = 0; i < this.state.numResources; i++) {
                tableData.push({ 'ID': this.state.resources[i].resource_id, 'Resource Name': this.state.resources[i].resource_name, 'Manager ID': this.state.resources[i].manager_id, 'Status': this.state.resources[i].status });
                resourceIDs.push(this.state.resources[i].resource_id);
            }
            this.setState({ rows: tableData});
            this.setState({ resourceIDs: resourceIDs});
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
                <Link to={{pathname: '/resource/report', state: {c: {columns}, r: {rows}}}}><button>Create report</button></Link>
            </div>
        );
    }

}

export default Resource;
