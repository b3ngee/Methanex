import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

class AddPortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioName: '',
            portfolioID: '',
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            // TODO: create add portfolio endpoint
            axios.post('https://methanex-portfolio-management.herokuapp.com/portfolios', {
                name: this.state.portfolioName,
                id: this.state.portfolioID
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'portfolio_created') {
                    console.log(response);
                    this.setState({
                        portfolioName: '',
                        portfolioID: '',
                        errors: {}
                    });
                }
            });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    isValid() {
        let hasError = true;

        if (!this.state.portfolioName) {
            this.setState({ errors: { portfolioName: 'Portfolio name is required'}});
            hasError = false;
        }
        if (!this.state.portfolioID) {
            this.setState({ errors: { portfolioID: 'PortfolioID is required'}});
            hasError = false;
        }
        return hasError;
    }
    render() {
        const { portfolioName, portfolioID, errors } = this.state;
        return (
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
                    <TextFieldGroup
                        field="portfolioID"
                        label="Portfolio ID"
                        value={portfolioID}
                        error={errors.portfolioID}
                        onChange={this.onChange}
                    />
                    <Button
                        type="submit"
                        label="Submit"
                    />
                </form>
            </div>
        );
    }
}

export default AddPortfolioForm;
