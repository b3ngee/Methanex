import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import Dropdown from './Dropdown';
import PopupBox from './PopupBox';

class AddPortfolioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successModalOpen: false,
            errorModalOpen: false,
            portfolioName: '',
            portfolioClassificationID: '',
            portfolioManagerID: '',
            managers: [],
            classifications: [],
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.listManagers();
        this.listClassifications();
    }

    listManagers() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users?role=PORTFOLIO_MANAGER').then((userResp) => {
            this.setState({ managers: userResp.data });
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
        this.props.history.push('/portfolio');
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    isValid() {
        let isValid = true;

        if (!this.state.portfolioName) {
            this.setState({ errors: { portfolioName: 'Portfolio name is required'}});
            isValid = false;
        }
        if (!this.state.portfolioClassificationID) {
            this.setState({ errors: { portfolioClassificationID: 'Portfolio Classification ID is required'}});
            isValid = false;
        }
        return isValid;
    }

    render() {
        const { portfolioName, errors, successModalOpen, errorModalOpen, errorMessage } = this.state;
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
                        error={errors.portfolioClassificationID}
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

AddPortfolioForm.propTypes = {
    history: PropTypes.any
};

export default AddPortfolioForm;
