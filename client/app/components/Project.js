import React from 'react';
import {Link} from 'react-router-dom';

import { project } from '../styles/project.scss';
import Table from './Table';
import axios from 'axios';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProject: 0,
            selectedProjectID: 0,
            rows: [],
            projectIDs: [],

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
            const projectIDs = [];
            for (let i = 0; i < this.state.numProject; i++) {
                tableData.push({ 'ID': this.state.projects[i].project_id, 'Project Name': this.state.projects[i].project_name, 'Project Manager': this.state.projects[i].project_manager, 'Status': this.state.projects[i].rag_status });
                projectIDs.push(this.state.projects[i].project_id);
            }
            console.log(projectIDs);
            this.setState({ rows: tableData});
            this.setState({ projectIDs: projectIDs});
        }).catch( () => {

        });
    }

    render() {
        let columns = ['ID', 'Project Name', 'Project Manager', 'Status'];
        return(
            <div className={ project }>
                <h1>My Projects</h1>
                <Table text="List of Projects" columns={columns} rows={this.state.rows} ids={this.state.projectIDs}/>

                <ul>
                    {this.state.projectIDs.map((ID) => (
                      <li key={ID}>
                        <Link to={`/project/${ID}`}>{ID}</Link>
                      </li>
                    ))}
                </ul>

            </div>
        );
    }
}

export default Project;
