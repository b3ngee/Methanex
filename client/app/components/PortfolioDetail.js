import React from 'react';
import { Link } from 'react-router-dom';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button.js';
import PopupBox from './PopupBox.js';
import axios from 'axios';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';
import { Promise } from 'es6-promise';

class PortfolioDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioId: this.props.match.params.portfolio_id,
            currentPortfolio: [],
            classifications: [],
            managerNames: [],
            projects: [],
            rows: [],
            successModalOpen: false,
        };

        this.deletePortfolio = this.deletePortfolio.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
    }


    componentDidMount() {
        this.fetchPortfolioData();
    }

    fetchPortfolioData() {
        const currPortfolio = axios.get('https://methanex-portfolio-management.herokuapp.com/portfolios/' + this.state.portfolioId, {headers: {Pragma: 'no-cache'}});
        const classifications = axios.get('https://methanex-portfolio-management.herokuapp.com/classifications', {headers: {Pragma: 'no-cache'}});
        const managers = axios.get('https://methanex-portfolio-management.herokuapp.com/users?role=PORTFOLIO_MANAGER', {headers: {Pragma: 'no-cache'}});
        const projects = axios.get('https://methanex-portfolio-management.herokuapp.com/projects?portfolioId=' + this.state.portfolioId, {headers: {Pragma: 'no-cache'}});

        Promise.all([currPortfolio, classifications, managers, projects]).then(response => {
            const classificationObjects = response[1].data.map(c => {
                return { id: c.id, name: c.name };
            });
            const managerObjects = response[2].data.map(m => {
                return { id: m.id, name: m.firstName + ' ' + m.lastName };
            });
            const projectObjects = response[3].data.map(p => {
                return {
                    'ID': p.id,
                    'Project Name': p.name,
                    'Project Status': sanitizeProjectStatus(p.projectStatus),
                    'RAG Status': sanitizeRagStatus(p.ragStatus),
                    'Budget': p.budget
                };
            });
            const portfolioObject = [{
                'ID': response[0].data.id,
                'Portfolio Name': response[0].data.name,
                'Classification': classificationObjects.filter(c => c.id === response[0].data.classificationId )[0].name,
                'Manager': managerObjects.filter(m => m.id === response[0].data.managerId )[0].name
            }];

            this.setState({ currentPortfolio: portfolioObject, classifications: classificationObjects, managerNames: managerObjects, projects: projectObjects });
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
        const { currentPortfolio, projects, classifications, managerNames } = this.state;
        const projectColumns = ['ID', 'Project Name', 'Project Status', 'RAG Status', 'Budget'];
        const portfolioColumns = ['ID', 'Portfolio Name', 'Classification', 'Manager'];

        return(
            <div className={ project }>
                <h1>{currentPortfolio['Portfolio Name']}</h1>
                <h2>Portfolio Details</h2>
                <Table columns={portfolioColumns} rows={currentPortfolio} />
                <p>Deleting portfolio will delete all instances of that portfolio</p>
                <span>
                    <Link to={{pathname: '/portfolio/edit', state: { currentPortfolio, classifications, managerNames }}}>
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
                <Table columns={projectColumns} rows={projects}/>
            </div>
        );
    }
}

PortfolioDetails.propTypes = {
    match: React.PropTypes.any,
    location: React.PropTypes.any,
};

export default PortfolioDetails;
