import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import { portfolio } from '../styles/portfolio.scss';
import Dropdown from './Dropdown';

class AddPortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioName: '',
            portfolioClassificationID: '',
            portfolioManagerID: '',
            managerIDs: [],
            classificationIDs: [],
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.listManagers();
        this.listClassifications();
    }

    listManagers() {
        // TODO: need to check how to get manager IDs
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-roles').then(response => {
            console.log(response.data[0].name);
            const len = response.data.length;
            const managerIDs = [];
            for (let i = 0; i < len; i++) {
                if (response.data[i].role === 'PORTFOLIO_MANAGER') {
                    managerIDs.push(response.data[i].id);
                }
            }
            this.setState({managerIDs: managerIDs});
            console.log(this.state.managerIDs);
        }).catch(()=>{

        });
    }

    listClassifications() {
        // TODO: need to check how to get manager IDs
        axios.get('https://methanex-portfolio-management.herokuapp.com/classifications').then(response => {
            console.log(response.data[0].name);
            const len = response.data.length;
            const classificationIDs = [];
            for (let i = 0; i < len; i++) {
                classificationIDs.push(response.data[i].id);
            }
            this.setState({classificationIDs: classificationIDs});
            console.log(this.state.classificationIDs);
        }).catch(()=>{

        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            // TODO: create add portfolio endpoint
            axios.post('https://methanex-portfolio-management.herokuapp.com/portfolios', {
                name: this.state.portfolioName,
                classificationId: this.state.portfolioClassificationID
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'portfolio_created') {
                    console.log(response);
                    this.setState({
                        portfolioName: '',
                        portfolioClassificationID: '',
                        errors: {}
                    });
                }
            });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name);
    }
    isValid() {
        let hasError = true;

        if (!this.state.portfolioName) {
            this.setState({ errors: { portfolioName: 'Portfolio name is required'}});
            hasError = false;
        }
        if (!this.state.portfolioClassificationID) {
            this.setState({ errors: { portfolioClassificationID: 'Portfolio Classification ID is required'}});
            hasError = false;
        }
        return hasError;
    }
    render() {
        const { portfolioName, errors } = this.state;
        return (
            <div className={ portfolio }>
                <div className={ formBox }>
                    <form onSubmit={this.onSubmit}>
                        <h2>Add new portfolio</h2>

                        <TextFieldGroup
                            field="portfolioName"
                            label="Portfolio Name"
                            value={portfolioName}
                            error={errors.portfolioName}
                            onChange={this.onChange}
                        />
                        <label>Portoflio Classification ID</label>
                        <Dropdown field="portfolioManagerID" data={this.state.classificationIDs} onChange={this.onChange}/>
                        <label>Manager ID</label>
                        <Dropdown field="portfolioClassificationID" data={this.state.managerIDs} onChange={this.onChange}/>
                        <Button
                            type="submit"
                            label="Submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default AddPortfolioForm;
