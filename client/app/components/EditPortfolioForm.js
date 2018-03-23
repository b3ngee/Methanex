import React from 'react';
import axios from 'axios';
import { formBox } from '../styles/form.scss';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import Dropdown from './Dropdown';
import PopupBox from './PopupBox';
import { prodAPIEndpoint, RAG_STATUS } from '../constants/constants';
import { enumifyRagStatus } from '../utils/sanitizer';

class EditPortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.currentPortfolio[0].ID,
            portfolioName: this.props.location.state.currentPortfolio[0]['Portfolio Name'],
            classificationName: this.props.location.state.currentPortfolio[0].Classification,
            managerName: this.props.location.state.currentPortfolio[0].Manager,
            ragStatus: enumifyRagStatus(this.props.location.state.currentPortfolio[0]['RAG Status']),
            classificationObjects: this.props.location.state.classifications,
            managerObjects: this.props.location.state.managerNames,
            errors: {},
            newClassification: '',
            newPortfolioManager: '',
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    isValid() {
        let isValid = true;

        if (!this.state.portfolioName) {
            this.setState({ errors: { portfolio: 'Portoflio is required'}});
            isValid = false;
        }
        if (!this.state.newClassification) {
            this.setState({ errors: { classification: 'Classification is required'}});
            isValid = false;
        }
        if (!this.state.newPortfolioManager) {
            this.setState({ errors: { manager: 'Portfolio Manager is required'}});
            isValid = false;
        }
        if (!this.state.ragStatus) {
            this.setState({ errors: { rag: 'RAG status is required' }});
            isValid = false;
        }

        return isValid;
    }

    onCloseSuccess() {
        this.props.history.push(`/portfolio/${this.state.id}`);
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.put(prodAPIEndpoint + '/portfolios/' + this.state.id, {
                id: this.state.id,
                managerId: this.state.newPortfolioManager,
                classificationId: this.state.newClassification,
                name: this.state.portfolioName,
                ragStatus: this.state.ragStatus
            }).then(response => {
                if (response.status === 200) {
                    this.setState({ successModalOpen: true });
                }
            }).catch((error) => {
                this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true });
            });
        }
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classificationObjects, managerObjects, portfolioName, classificationName, ragStatus, managerName, successModalOpen, errorModalOpen, errorMessage, errors } = this.state;
        const classificationId = classificationObjects.filter(co => co.name === classificationName)[0].id;
        const managerId = managerObjects.filter(mo => mo.name === managerName)[0].id;

        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2>Edit Portfolio</h2>
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
                        error={errors.portfolio}
                        onChange={this.onChange}
                    />
                    <Dropdown
                        label="Portfolio Classification"
                        name="newClassification"
                        data={classificationObjects}
                        preSelect={classificationId}
                        error={errors.classification}
                        onSelect={this.onChange}
                    />
                    <Dropdown
                        label="Portfolio Manager"
                        name="newPortfolioManager"
                        data={managerObjects}
                        preSelect={managerId}
                        error={errors.manager}
                        onSelect={this.onChange}
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

EditPortfolioForm.propTypes = {
    location: React.PropTypes.any,
    history: React.PropTypes.any
};

export default EditPortfolioForm;
