import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table';
import axios from 'axios';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';

class PortfolioDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProject: 0,
            selectedProjectID: 0,
            rows: [],
        };
        this.getProjects = this.getProjects.bind(this);
    }


    componentDidMount() {
        this.getProjects();
    }

    getProjects() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/projects?portfolioId=' + this.props.match.params.portfolio_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            this.setState({ numProject: response.data.length });
            this.setState({ projects: response.data });

            const tableData = [];
            for (let i = 0; i < this.state.numProject; i++) {
                tableData.push({ 'ID': this.state.projects[i].id, 'Project Name': this.state.projects[i].name, 'Project Status': sanitizeProjectStatus(this.state.projects[i].projectStatus), 'Status': sanitizeRagStatus(this.state.projects[i].ragStatus), 'Budget': this.state.projects[i].budget });
            }
            this.setState({ rows: tableData});
        }).catch( () => {
        });
    }

    render() {
        let columns = ['ID', 'Project Name', 'Project Status', 'Status', 'Budget'];
        return(
            <div className={ project }>
                <h1>Projects</h1>
                <p>{"Here's an overview of all projects under portfolio you chose"}</p>
                <Table columns={columns} rows={this.state.rows}/>
            </div>
        );
    }
}

PortfolioDetails.propTypes = {
    match: React.PropTypes.any,
};

export default PortfolioDetails;
