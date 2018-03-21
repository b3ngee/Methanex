import React from 'react';
import { Link } from 'react-router-dom';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button.js';
import PopupBox from './PopupBox.js';
import axios from 'axios';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';

class PortfolioDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioId: this.props.match.params.portfolio_id,
            currentPortfolio: [this.props.location.state.row],
            projects: [],
            rows: [],
            successModalOpen: false,
        };

        this.deletePortfolio = this.deletePortfolio.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
    }


    componentDidMount() {
        this.getProjects();
    }

    getProjects() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/projects?portfolioId=' + this.state.portfolioId, {headers: {Pragma: 'no-cache'}}).then(response => {
            const tableData = response.data.map(d => {
                return {
                    'ID': d.id,
                    'Project Name': d.name,
                    'Project Status': sanitizeProjectStatus(d.projectStatus),
                    'RAG Status': sanitizeRagStatus(d.ragStatus),
                    'Budget': d.budget
                };
            });

            this.setState({ projects: response.data, rows: tableData });
        });
    }

    deletePortfolio() {
        axios.delete('https://methanex-portfolio-management.herokuapp.com/portfolios/' + this.state.currentPortfolio[0].ID).then(response => {
            if (response.status === 200) {
                this.setState({ successModalOpen: true });
            }
        });
    }

    onCloseSuccess() {
        window.history.back();
    }

    render() {
        let projectColumns = ['ID', 'Project Name', 'Project Status', 'RAG Status', 'Budget'];
        let portfolioColumns = ['ID', 'Portfolio Name', 'Classification'];

        return(
            <div className={ project }>
                <h1>{this.state.currentPortfolio[0]['Portfolio Name']}</h1>
                <h2>Portfolio Details</h2>
                <Table columns={portfolioColumns} rows={this.state.currentPortfolio} />
                <p>Deleting portfolio will delete all instances of that portfolio</p>
                <span>
                    <Link to={{pathname: '/portfolio/edit', state: this.state.currentPortfolio}}>
                        <Button type="submit" label="Edit"/>
                    </Link>
                </span>
                <PopupBox
                    label="Successfully Deleted!"
                    isOpen={this.state.successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <Button type="submit" label="Delete" onClick={this.deletePortfolio}/>
                <h2>Projects</h2>
                <p>Click on project name to see more details</p>
                <Table columns={projectColumns} rows={this.state.rows}/>
            </div>
        );
    }
}

PortfolioDetails.propTypes = {
    match: React.PropTypes.any,
    location: React.PropTypes.any,
};

export default PortfolioDetails;
