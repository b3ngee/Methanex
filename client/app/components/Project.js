import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button';
import axios from 'axios';
import {Link} from 'react-router-dom';

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

    // TODO: need to change the end points
    getProjects() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/projects?portfolioType=&projectOwner=').then(response => {
            this.setState({ numProject: response.data.length });
            this.setState({ projects: response.data });

            const tableData = [];
            for (let i = 0; i < this.state.numProject; i++) {
                tableData.push({ 'ID': this.state.projects[i].id, 'Project Name': this.state.projects[i].name, 'Project Status': this.state.projects[i].projectStatus, 'Status': this.state.projects[i].ragStatus, 'Budget': this.state.projects[i].budget });
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
