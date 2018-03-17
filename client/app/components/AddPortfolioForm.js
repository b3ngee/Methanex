import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import Dropdown from './Dropdown';

class AddPortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioName: '',
            portfolioClassificationID: '',
            portfolioManagerID: '',
            managers: [],
            classifications: [],
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
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-roles').then(roleResp => {
            const portfolioManagerIDs = roleResp.data.filter(r => {
                return r.role === 'PORTFOLIO_MANAGER';
            }).map(ro => {
                return ro.userId;
            });

            axios.get('https://methanex-portfolio-management.herokuapp.com/users').then((userResp) => {
                const portfolioManager = userResp.data.filter(u => {
                    return portfolioManagerIDs.includes(u.id);
                });

                this.setState({ managers: portfolioManager });
            });
        });
    }

    listClassifications() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/classifications').then((classificationResp) => {
            this.setState({ classifications: classificationResp.data });
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/portfolios', {
                name: this.state.portfolioName,
                classificationId: this.state.portfolioClassificationID,
                managerId: this.state.portfolioManagerID
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({
                        portfolioName: '',
                        portfolioClassificationID: '',
                        portfolioManagerID: '',
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
        if (!this.state.portfolioClassificationID) {
            this.setState({ errors: { portfolioClassificationID: 'Portfolio Classification ID is required'}});
            hasError = false;
        }
        return hasError;
    }

    render() {
        const { portfolioName, errors } = this.state;
        const classificationObjects = this.state.classifications.map(co => {
            return { id: co.id, name: co.name };
        });
        const managerObjects = this.state.managers.map(mo => {
            return { id: mo.id, name: mo.firstName + ' ' + mo.lastName };
        });

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
                    <Dropdown
                        label="Portfolio Classification"
                        name="portfolioClassificationID"
                        data={classificationObjects}
                        onSelect={this.onChange}
                    />
                    <Dropdown
                        label="Portfolio Manager"
                        name="portfolioManagerID"
                        data={managerObjects}
                        onSelect={this.onChange}
                    />
                    <Button
                        type="submit"
                        label="Create Portfolio"
                    />
                </form>
            </div>
        );
    }
}

export default AddPortfolioForm;
