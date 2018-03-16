import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

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
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
                console.log(response.status);
                if (response.status === 200) {
                    this.props.history.push(`/project/${id}`);
                }
                console.log('in on submit');
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        let hasError = true;

        if (!this.state.name) {
            this.setState({ errors: { name: 'Project name is required'}});
            hasError = false;
        }
        if (!this.state.budget) {
            this.setState({ errors: { manager: 'Project budget is required'}});
            hasError = false;
        }
        if (!this.state.portfolioId) {
            this.setState({ errors: { owner: 'Portfolio ID is required' }});
            hasError = false;
        }

        return hasError;
    }

    render() {
        const {portfolioId, name, projectStatus, ragStatus, budget, spentToDate, estimateToComplete, managerId, complete, startDate, endDate, errors} = this.state;
        console.log(this.props.location.state.data);
        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Edit Project</h2>

                <TextFieldGroup
                    field="name"
                    label="Project Name"
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="portfolioId"
                    label="Portfolio ID"
                    value={portfolioId}
                    error={errors.portfolioId}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="projectStatus"
                    label="Project Status"
                    value={projectStatus}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="ragStatus"
                    label="RAG Status"
                    value={ragStatus}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="budget"
                    label="Budget"
                    value={budget}
                    error={errors.budget}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="spentToDate"
                    label="Spent To Date"
                    value={spentToDate}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="estToComplete"
                    label="Estimate To Complete"
                    value={estimateToComplete}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="managerId"
                    label="Manager ID"
                    value={managerId}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="complete"
                    label="Complete"
                    value={complete}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="startDate"
                    label="Start Date MM-DD-YYYY"
                    value={startDate}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="endDate"
                    label="End Date MM-DD-YYYY"
                    value={endDate}
                    onChange={this.onChange}
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
