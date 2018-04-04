import React from 'react';
import { Link } from 'react-router-dom';
import { project } from '../styles/project.scss';
import Table from './Table';
import Button from './Button';
import PopupBox from './PopupBox';
import axios from 'axios';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';
import { Promise } from 'es6-promise';
import PopupBoxTwoButtons from './PopupBoxTwoButtons';
import { prodAPIEndpoint } from '../constants/constants';

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
            errorModalOpen: false,
            deletionModalOpen: false
        };

        this.deletePortfolio = this.deletePortfolio.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
        this.handleDeletePortfolio = this.handleDeletePortfolio.bind(this);
        this.onCloseDeletion = this.onCloseDeletion.bind(this);
        this.onCancelDeletion = this.onCancelDeletion.bind(this);
    }

    componentDidMount() {
        this.fetchPortfolioData();
    }

    fetchPortfolioData() {
        const currPortfolio = axios.get(prodAPIEndpoint + '/portfolios/' + this.state.portfolioId, {headers: {Pragma: 'no-cache'}});
        const classifications = axios.get(prodAPIEndpoint + '/classifications', {headers: {Pragma: 'no-cache'}});
        const managers = axios.get(prodAPIEndpoint + '/users?role=PORTFOLIO_MANAGER', {headers: {Pragma: 'no-cache'}});
        const projects = axios.get(prodAPIEndpoint + '/projects?portfolioId=' + this.state.portfolioId, {headers: {Pragma: 'no-cache'}});

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
                'Manager': managerObjects.filter(m => m.id === response[0].data.managerId )[0].name,
                'RAG Status': sanitizeRagStatus(response[0].data.ragStatus)
            }];

            this.setState({ currentPortfolio: portfolioObject, classifications: classificationObjects, managerNames: managerObjects, projects: projectObjects });
        });
    }

    handleDeletePortfolio() {
        this.setState({deletionModalOpen: true});
    }

    onCloseDeletion() {
        this.deletePortfolio();
    }

    onCancelDeletion() {
        this.setState({
            deletionModalOpen: false,
            errorMessage: 'deletion has been canceled',
            errorModalOpen: true
        });
    }

    deletePortfolio() {
        axios.delete(prodAPIEndpoint + '/portfolios/' + this.state.currentPortfolio[0].ID).then(response => {
            if (response.status === 200) {
                this.setState({
                    deletionModalOpen: false,
                    successModalOpen: true
                });
            }
        }).catch((error) => {
            this.setState({
                errorMessage: 'Error: ' + error.response.data.message,
                errorModalOpen: true
            });
        });
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
//        window.history.back();
    }

    render() {
        const { currentPortfolio, projects, classifications, managerNames, deletionModalOpen, errorModalOpen, errorMessage } = this.state;
        const projectColumns = ['ID', 'Project Name', 'Project Status', 'RAG Status', 'Budget'];
        const portfolioColumns = ['ID', 'Portfolio Name', 'Classification', 'Manager', 'RAG Status'];

        return(
            <div className={ project }>
                <h1>{currentPortfolio['Portfolio Name']}</h1>
                <h2>Portfolio Details</h2>
                <Table columns={portfolioColumns} rows={currentPortfolio} />
                <span>
                    <Link to={{pathname: '/portfolio/edit', state: { currentPortfolio, classifications, managerNames }}}>
                        <Button type="submit" label="Edit"/>
                    </Link>
                </span>
                <PopupBoxTwoButtons
                    label="Deleting this portfolio will delete all associated projects. Are you sure you want to continue?"
                    isOpen={deletionModalOpen}
                    onClose={this.onCloseDeletion}
                    onCancel={this.onCancelDeletion}
                />
                <PopupBox
                    label="Successfully Deleted!"
                    isOpen={this.state.successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <Button type="submit" label="Delete" onClick={this.handleDeletePortfolio}/>
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
