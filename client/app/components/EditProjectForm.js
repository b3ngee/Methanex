import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

class EditProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.data[0].value,
            name: this.props.location.state.data[1].value,
            manager: this.props.location.state.data[2].value,
            owner: this.props.location.state.data[3].value,
            percentComplete: this.props.location.state.data[4].value,
            duration: this.props.location.state.data[5].value,
            status: this.props.location.state.data[6].value,
            budget: this.props.location.state.data[7].value,
            spendToDate: this.props.location.state.data[8].value,
            estimateToComplete: this.props.location.state.data[9].value,
            resourceLink: this.props.location.state.data[10].value,
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            const id = this.state.id;
            axios.put('https://private-2a709-methanex.apiary-mock.com/project/' + id, {
                id: this.state.id,
                name: this.state.name,
                manager: this.state.manager,
                owner: this.state.owner,
                percent_complete: this.state.percentComplete,
                duration: this.state.duration,
                status: this.state.status,
                budget: this.state.budget,
                spend_to_date: this.state.spendToDate,
                estimate_to_complete: this.state.estimateToComplete,
                resource_link: this.state.resourceLink,
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'project_updated') {
                    this.props.history.push(`/project/${id}`);
                }
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
        if (!this.state.manager) {
            this.setState({ errors: { manager: 'Project manager is required'}});
            hasError = false;
        }
        if (!this.state.owner) {
            this.setState({ errors: { owner: 'Owner is required' }});
            hasError = false;
        }
        if (!this.state.duration) {
            this.setState({errors: { duration: 'Duration is required'}});
            hasError = false;
        }

        return hasError;
    }

    render() {
        const { name, manager, owner, percentComplete, duration, status, budget, spendToDate, estimateToComplete, resourceLink, errors } = this.state;

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
                    field="manager"
                    label="Manager Name"
                    value={manager}
                    error={errors.manager}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="owner"
                    label="Project Owner"
                    value={owner}
                    error={errors.owner}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="percent_complete"
                    label="% Complete"
                    value={percentComplete}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="duration"
                    label="Duration"
                    value={duration}
                    error={errors.duration}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="status"
                    label="Status"
                    value={status}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="budget"
                    label="Budget"
                    value={budget}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="spend_to_date"
                    label="Spend To Date"
                    value={spendToDate}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="estimate_to_complete"
                    label="Estimate To Complete"
                    value={estimateToComplete}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="resource_link"
                    label="Resource Link"
                    value={resourceLink}
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
};
