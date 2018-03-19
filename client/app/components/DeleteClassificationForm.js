import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';

class DeleteClassificationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classifications: [],
            classID: '',
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getClassifications();
    }

    getClassifications() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/classifications').then((response) => {
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
        console.log(this.state.classID);
        if (this.isValid()) {
            axios.delete('https://methanex-portfolio-management.herokuapp.com/classifications/' + this.state.classID, {
                id: this.state.classID
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        classID: '',
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
        const { classifications, successModalOpen, errorModalOpen, errorMessage, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Delete Project Classification</h2>
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
                    onSelect={this.onChange}
                    error={errors.classID}
                />
                <Button
                    type="submit"
                    label="Delete"
                />
            </form>
        </div>
        );
    }
}

export default DeleteClassificationForm;
