import React from 'react';
import axios from 'axios';
import { formBox } from '../styles/form.scss';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import Dropdown from './Dropdown';
import PopupBox from './PopupBox';

class EditPortfolioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state[0].ID,
            classifications: [],
            classificationObjects: [],
            managers: [],
            managerObjects: [],
            errors: {},
            currentClassificationID: '',
            currentManagerID: this.props.location.state[0].Manager,
            currentClassification: this.props.location.state[0].Classification,
            currentPortfolioName: this.props.location.state[0]['Portfolio Name'],
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

    componentDidMount() {
        this.fetchClassifications();
        this.fetchManagers();
    }

    fetchClassifications() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/classifications').then(response => {
            const classificationObjects = response.data.map(c => {
                return { id: c.id, name: c.name };
            });
            this.setState({ classifications: response.data, classificationObjects: classificationObjects });
        }).then(() => {
            const currentClassificationID = this.state.classificationObjects.filter(co => {
                return co.name === this.state.currentClassification;
            })[0].id;

            this.setState({ currentClassificationID: currentClassificationID });
        });
    }

    fetchManagers() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users?role=PORTFOLIO_MANAGER').then(response => {
            const managerObjects = response.data.map(m => {
                return { id: m.id, name: m.firstName + ' ' + m.lastName };
            });

            this.setState({ managers: response.data, managerObjects: managerObjects });
        }).then(() => {

        });
    }

    isValid() {
        return true;
    }

    onCloseSuccess() {
        this.props.history.push(`/portfolio/${this.state.id}`);
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    onSubmit(e) {
        console.log(this.state);
        e.preventDefault();
        if (this.isValid()) {
            axios.put('https://methanex-portfolio-management.herokuapp.com/portfolios/' + this.state.id, {
                id: this.state.id,
                managerId: this.state.newPortfolioManager,
                classificationId: this.state.newClassification,
                name: this.state.currentPortfolioName,
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
        const { classificationObjects, managerObjects, currentPortfolioName, currentClassificationID, currentManagerID, successModalOpen, errorModalOpen, errorMessage, errors } = this.state;

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
                        field="currentPortfolioName"
                        label="Portfolio Name"
                        value={currentPortfolioName}
                        error={errors.name}
                        onChange={this.onChange}
                    />
                    <Dropdown
                        label="Portfolio Classification"
                        name="newClassification"
                        data={classificationObjects}
                        preSelect={currentClassificationID}
                        error={errors.classification}
                        onSelect={this.onChange}
                    />
                    <Dropdown
                        label="Portfolio Manager"
                        name="newPortfolioManager"
                        data={managerObjects}
                        preSelect={currentManagerID}
                        error={errors.manager}
                        onSelect={this.onChange}
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
