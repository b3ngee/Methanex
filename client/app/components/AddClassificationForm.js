import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';

class AddClassificationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classification: '',
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    isValid() {
        if(!this.state.classification) {
            this.setState({ errors: { classification: 'Classification is required' }});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/classifications', {
                name: this.state.classification
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({
                    classification: '',
                    errors: {}, successModalOpen: true
                    });
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
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { classification, errors, successModalOpen, errorModalOpen, errorMessage } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Classification</h2>
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
                    field="classification"
                    label="New Classification"
                    value={classification}
                    error={errors.classification}
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

export default AddClassificationForm;
