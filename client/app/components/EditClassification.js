import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import TextFieldGroup from './TextFieldGroup';
import { prodAPIEndpoint } from '../constants/constants';

class DeleteClassificationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classifications: [],
            newClassification: '',
            classID: '',
            hasOptionSelected: false,
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getClassifications();
    }

    getClassifications() {
        axios.get(prodAPIEndpoint + '/classifications', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({classifications: response.data});
        });
    }

    isValid() {
        let isValid = true;

        if (!this.state.classID) {
           this.setState({errors: { classID: 'Select a Classification' }});
           isValid = false;
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.put(prodAPIEndpoint + '/classifications/' + this.state.classID, {
                name: this.state.newClassification
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        classID: '',
                        hasOptionSelected: false,
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

    handleSelect(e) {
        this.setState({
            [e.target.name]: e.target.value,
            hasOptionSelected: true
        });
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { classifications, newClassification, successModalOpen, errorModalOpen, hasOptionSelected, errorMessage, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Edit Project Classification</h2>
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
                <Dropdown
                    label="Select a Classification"
                    name="classID"
                    data={classifications}
                    onSelect={this.handleSelect}
                    error={errors.classID}
                />

                {hasOptionSelected &&
                    <TextFieldGroup
                        field="newClassification"
                        label="Enter New Name for Classification"
                        value={newClassification}
                        error={errors.classifications}
                        onChange={this.onChange}
                    />
                }

                <Button
                    type="submit"
                    label="Submit"
                />
            </form>
        </div>
        );
    }
}

export default DeleteClassificationForm;
