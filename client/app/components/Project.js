import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table';
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
        axios.get('https://private-05c14-methanex.apiary-mock.com/projects?portfolioType=&projectOwner=').then(response => {
            this.setState({ numProject: response.data.length });
            this.setState({ projects: response.data });

            const tableData = [];
            for (let i = 0; i < this.state.numProject; i++) {
                tableData.push({ 'ID': this.state.projects[i].project_id, 'Project Name': this.state.projects[i].project_name, 'Project Manager': this.state.projects[i].project_manager, 'Status': this.state.projects[i].rag_status });
            }
            this.setState({ rows: tableData});
        }).catch( () => {
        });
    }

    render() {
        let columns = ['ID', 'Project Name', 'Project Manager', 'Status'];
        const rows = this.state.rows;
        return(
            <div className={ project }>
                <h1>My Projects</h1>
                <Table text="List of Projects" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/project/report', state: {c: {columns}, r: {rows}}}}>
                        <button>Create report</button>
                    </Link>
                </span>
            </div>
        );
    }
}

export default Project;
