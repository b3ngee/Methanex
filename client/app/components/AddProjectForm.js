import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import PopupBox from './PopupBox';
import { formBox } from '../styles/form.scss';
import { STATUS, RAG_STATUS, COMPLETE } from '../constants/constants';

class AddProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successModalOpen: false,
            errorModalOpen: false,
            portfolios: [],
            managers: [],
            errors: {},
            portfolio: '',
            manager: '',
            name: '',
            status: '',
            rag: '',
            budget: '',
            spentToDate: '',
            estimateToComplete: '',
            complete: '',
            startDate: '',
            endDate: '',
            ganttChart: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.fetchPortfolios();
        this.fetchManagers();
    }

    fetchPortfolios() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/portfolios').then((portfolioResp) => {
            this.setState({ portfolios: portfolioResp.data });
        });
    }

    fetchManagers() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users?role=PROJECT_MANAGER').then((userResp) => {
            this.setState({ managers: userResp.data });
        });
    }

    isValid() {
        let isValid = true;
        if (!this.state.portfolio) {
            this.setState({ errors: { porfolio: 'Portoflio is required'}});
            isValid = false;
        }
        if (!this.state.name) {
            this.setState({ errors: { name: 'Project name is required'}});
            isValid = false;
        }
        if (!this.state.status) {
            this.setState({ errors: { status: 'Project status is required'}});
            isValid = false;
        }
        if (!this.state.rag) {
            this.setState({ errors: { rag: 'RAG status is required' }});
            isValid = false;
        }
        if (!this.state.budget) {
            this.setState({ errors: { budget: 'Budget is required' }});
            isValid = false;
        }
        if (!this.state.spentToDate) {
            this.setState({ errors: { std: 'Spent to Date is required' }});
            isValid = false;
        }
        if (!this.state.estimateToComplete) {
            this.setState({ errors: { etc: 'Estimate to Complete is required' }});
            isValid = false;
        }
        if (!this.state.manager) {
            this.setState({ errors: { manager: 'Manager is required' }});
            isValid = false;
        }
        if (!this.state.complete) {
            this.setState({ errors: { complete: 'Completion status is required' }});
            isValid = false;
        }
        if (!this.state.startDate) {
            this.setState({ errors: { startDate: 'Start date is required' }});
            isValid = false;
        }
        if (!this.state.endDate) {
            this.setState({ errors: { endDate: 'End date is required' }});
            isValid = false;
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/projects', {
                portfolioId: this.state.portfolio,
                name: this.state.name,
                projectStatus: this.state.status,
                ragStatus: this.state.rag,
                budget: this.state.budget,
                spentToDate: this.state.spentToDate,
                estimateToComplete: this.state.estimateToComplete,
                managerId: this.state.manager,
                complete: this.state.complete,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                ganttChart: this.state.ganttChart,
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({ successModalOpen: true });
                }
            }).catch((error) => {
                this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true });
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCloseSuccess() {
        this.props.history.push('/project');
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { name, budget, spentToDate, estimateToComplete, startDate, endDate, errors, successModalOpen, errorModalOpen, errorMessage  } = this.state;

        const portfolioObjects = this.state.portfolios.map((po) => {
            return { id: po.id, name: po.name };
        });
        const managerObjects = this.state.managers.map((mo) => {
            return { id: mo.id, name: mo.firstName + ' ' + mo.lastName };
        });

        return (
            <div className = { formBox }>
                <form onSubmit = {this.onSubmit}>
                    <h2>Add new project</h2>
                    <PopupBox
                        label="Successful!"
                        isOpen={successModalOpen}
                        onClose={this.onCloseSuccess}
                    />
                    <PopupBox
                        label={errorMessage}
                        isOpen={errorModalOpen}
                        onClose={this.onCloseError}
                    />
                    <Dropdown
                        label="Portfolio"
                        name="portfolio"
                        data={portfolioObjects}
                        onSelect={this.onChange}
                        error={errors.porfolio}
                    />
                    <Dropdown
                        label="Project Manager"
                        name="manager"
                        data={managerObjects}
                        onSelect={this.onChange}
                        error={errors.manager}
                    />
                    <TextFieldGroup
                        field="name"
                        label="Project Name"
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                    />
                    <TextFieldGroup
                        field="budget"
                        label="Budget ($)"
                        value={budget}
                        onChange={this.onChange}
                        error={errors.budget}
                    />
                    <TextFieldGroup
                        field="estimateToComplete"
                        label="Estimate to Complete ($)"
                        value={estimateToComplete}
                        onChange={this.onChange}
                        error={errors.etc}
                    />
                    <TextFieldGroup
                        field="spentToDate"
                        label="Spent to Date ($)"
                        value={spentToDate}
                        onChange={this.onChange}
                        error={errors.std}
                    />
                    <TextFieldGroup
                        type="date"
                        field="startDate"
                        label="Start Date"
                        value={startDate}
                        onChange={this.onChange}
                        error={errors.startDate}
                    />
                    <TextFieldGroup
                        type="date"
                        field="endDate"
                        label="End Date"
                        value={endDate}
                        onChange={this.onChange}
                        error={errors.endDate}
                    />
                    <Dropdown
                        label="Complete"
                        name="complete"
                        data={COMPLETE}
                        onSelect={this.onChange}
                        error={errors.complete}
                    />
                    <Dropdown
                        label="Status"
                        name="status"
                        data={STATUS}
                        onSelect={this.onChange}
                        error={errors.status}
                    />
                    <Dropdown
                        label="RAG Status"
                        name="rag"
                        data={RAG_STATUS}
                        onSelect={this.onChange}
                        error={errors.rag}
                    />
                    <Button
                        type="submit"
                        label="Create Project"
                    />
                </form>
            </div>
        );
    }
}

AddProjectForm.propTypes = {
    history: PropTypes.any
};

export default AddProjectForm;
