import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import Dropdown from './Dropdown';
import { formBox } from '../styles/form.scss';
import { STATUS, RAG_STATUS, COMPLETE } from '../constants/constants';
import PopupBox from './PopupBox';

class EditProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.data[0].Value,
            portfolioId: this.props.location.state.data[1].Value,
            name: this.props.location.state.data[2].Value,
            projectStatus: this.props.location.state.data[3].Value,
            ragStatus: this.props.location.state.data[4].Value,
            budget: this.props.location.state.data[5].Value,
            spentToDate: this.props.location.state.data[6].Value,
            estimateToComplete: this.props.location.state.data[7].Value,
            managerId: this.props.location.state.data[8].Value,
            complete: this.props.location.state.data[9].Value,
            startDate: this.props.location.state.data[10].Value,
            endDate: this.props.location.state.data[11].Value,
            ganttChart: this.props.location.state.data[12].Value,
            portfolios: [],
            managers: [],
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
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
        axios.get('https://methanex-portfolio-management.herokuapp.com/portfolios', {headers: {Pragma: 'no-cache'}}).then((portfolioResp) => {
            this.setState({ portfolios: portfolioResp.data });
        });
    }

    fetchManagers() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-roles', {headers: {Pragma: 'no-cache'}}).then((roleResp) => {
            const projectManagerIDs = roleResp.data.filter(r => {
                return r.role === 'PROJECT_MANAGER';
            }).map(ro => {
                return ro.userId;
            });

            axios.get('https://methanex-portfolio-management.herokuapp.com/users', {headers: {Pragma: 'no-cache'}}).then((userResp) => {
                const projectManagers = userResp.data.filter(u => {
                    return projectManagerIDs.includes(u.id);
                });

                this.setState({ managers: projectManagers });
            });
        });
    }

    isValid() {
        let isValid = true;
        if (!this.state.portfolioId) {
            this.setState({ errors: { porfolio: 'Portoflio is required'}});
            isValid = false;
        }
        if (!this.state.name) {
            this.setState({ errors: { name: 'Project name is required'}});
            isValid = false;
        }
        if (!this.state.projectStatus) {
            this.setState({ errors: { status: 'Project status is required'}});
            isValid = false;
        }
        if (!this.state.ragStatus) {
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
        if (!this.state.managerId) {
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
            const id = this.state.id;
            axios.put('https://methanex-portfolio-management.herokuapp.com/projects/' + id, {
                id: this.state.id,
                portfolioId: this.state.portfolioId,
                name: this.state.name,
                projectStatus: this.state.projectStatus,
                ragStatus: this.state.ragStatus,
                budget: this.state.budget,
                spentToDate: this.state.spentToDate,
                estimateToComplete: this.state.estimateToComplete,
                managerId: this.state.managerId,
                complete: this.state.complete,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                ganttChart: this.state.ganttChart,
            }).then((response) => {
                if (response.status === 200) {
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
        this.props.history.push(`/project/${this.state.id}`);
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { portfolioId, managerId, name, projectStatus, ragStatus, budget, spentToDate, estimateToComplete, complete, startDate, endDate, errors, successModalOpen, errorModalOpen, errorMessage } = this.state;

        const portfolioObjects = this.state.portfolios.map((po) => {
            return { id: po.id, name: po.name };
        });
        const managerObjects = this.state.managers.map((mo) => {
            return { id: mo.id, name: mo.firstName + ' ' + mo.lastName };
        });
        console.log(this.props.location);
        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Edit Project</h2>
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
                    name="portfolioId"
                    data={portfolioObjects}
                    preSelect={portfolioId}
                    onSelect={this.onChange}
                    error={errors.porfolio}
                />
                <Dropdown
                    label="Project Manager"
                    name="managerId"
                    data={managerObjects}
                    preSelect={managerId}
                    onSelect={this.onChange}
                    error={errors.manager}
                />
                <TextFieldGroup
                    field="name"
                    label="Project Name"
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="budget"
                    label="Budget ($)"
                    value={budget}
                    error={errors.budget}
                    onChange={this.onChange}
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
                    preSelect={complete}
                    onSelect={this.onChange}
                    error={errors.complete}
                />
                <Dropdown
                    label="Status"
                    name="projectStatus"
                    data={STATUS}
                    preSelect={projectStatus}
                    onSelect={this.onChange}
                    error={errors.status}
                />
                <Dropdown
                    label="RAG Status"
                    name="ragStatus"
                    data={RAG_STATUS}
                    preSelect={ragStatus}
                    onSelect={this.onChange}
                    error={errors.rag}
                />
                <Button
                    type="submit"
                    label="Save"
                />
            </form>
        </div>
        );
    }
}

export default EditProjectForm;

EditProjectForm.propTypes = {
    data: PropTypes.any,
    location: PropTypes.any,
    history: PropTypes.any,
    match: PropTypes.any,
};
