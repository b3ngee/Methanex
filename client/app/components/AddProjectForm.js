import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import { STATUS, RAG_STATUS, COMPLETE } from '../constants/constants';

class AddProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolios: [],
            managers: [],
            portfolio: '',
            manager: '',
            name: '',
            status: '',
            rag: '',
            budget: '',
            spentToDate: '',
            estimateToComplete: '',
            startDate: '',
            endDate: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.fetchPortfolios();
        this.fetchManagers();
    }

    fetchPortfolios() {
        // axios.get('https://methanex-portfolio-management.herokuapp.com/portfolios').then((portfolioResp) => {
        axios.get('http://localhost:8080/portfolios').then((portfolioResp) => {
            this.setState({ portfolios: portfolioResp.data });
        });
    }

    fetchManagers() {
        // axios.get('https://methanex-portfolio-management.herokuapp.com/user-roles').then((roleResp) => {
        axios.get('http://localhost:8080/user-roles').then((roleResp) => {
            const projectManagerIDs = roleResp.data.filter(r => {
                return r.role === 'PROJECT_MANAGER';
            }).map(ro => {
                return ro.userId;
            });

            // axios.get('https://methanex-portfolio-management.herokuapp.com/users').then((userResp) => {
            axios.get('http://localhost:8080/users').then((userResp) => {
                const projectManagers = userResp.data.filter(u => {
                    return projectManagerIDs.includes(u.id);
                });

                this.setState({ managers: projectManagers });
            });
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // axios.post('https://methanex-portfolio-management.herokuapp.com/projects', {
        axios.post('http://localhost:8080/projects', {
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
                console.log('Success!');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { name, budget, spentToDate, estimateToComplete, startDate, endDate } = this.state;

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

                    <Dropdown
                        label="Portfolio"
                        name="portfolio"
                        data={portfolioObjects}
                        onSelect={this.onChange}
                    />
                    <Dropdown
                        label="Project Manager"
                        name="manager"
                        data={managerObjects}
                        onSelect={this.onChange}
                    />
                    <TextFieldGroup
                        field="name"
                        label="Project Name"
                        value={name}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        field="budget"
                        label="Budget"
                        value={budget}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        field="estimateToComplete"
                        label="Estimate to Complete"
                        value={estimateToComplete}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        field="spentToDate"
                        label="Spent to Date"
                        value={spentToDate}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        type="date"
                        field="startDate"
                        label="Start Date"
                        value={startDate}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        type="date"
                        field="endDate"
                        label="End Date"
                        value={endDate}
                        onChange={this.onChange}
                    />
                    <Dropdown
                        label="Complete"
                        name="complete"
                        data={COMPLETE}
                        onSelect={this.onChange}
                    />
                    <Dropdown
                        label="Status"
                        name="status"
                        data={STATUS}
                        onSelect={this.onChange}
                    />
                    <Dropdown
                        label="RAG Status"
                        name="rag"
                        data={RAG_STATUS}
                        onSelect={this.onChange}
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

export default AddProjectForm;
