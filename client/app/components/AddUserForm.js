import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import isValidEmail from '../utils/validationHelpers';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import { prodAPIEndpoint } from '../constants/constants';

class AddUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            location: '',
            status: 'available',
            enabled: true,
            errors: {},
            userID: '',
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post(prodAPIEndpoint + '/users', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                location: this.state.location,
                status: this.state.status,
                enabled: this.state.enabled,
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        address: '',
                        location: '',
                        status: '',
                        userId: 'Successful! The new user\'s userID is ' + response.data.id + '. Please add a role for this new user in the following page.',
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
       window.history.go('/setting/user');
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    isValid() {
        let hasError = true;

        if (!this.state.firstName) {
            this.setState({ errors: { firstName: 'First name is required'}});
            hasError = false;
        }
        if (!this.state.lastName) {
            this.setState({ errors: { lastName: 'Last name is required'}});
            hasError = false;
        }
        if (!this.state.email) {
            this.setState({ errors: { email: 'Email is required' }});
            hasError = false;
        } else if (!isValidEmail(this.state.email)) {
            this.setState({ errors: { email: 'Email format is invalid' }});
            hasError = false;
        }
        if (!this.state.password) {
            this.setState({errors: { password: 'Password is required'}});
            hasError = false;
        }

        return hasError;
    }

    render() {
        const { firstName, lastName, email, password, address, location, errors, successModalOpen, errorModalOpen, userId, errorMessage } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add new user</h2>
                <PopupBox
                    label={userId}
                    isOpen={successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <TextFieldGroup
                    field="firstName"
                    label="First Name"
                    value={firstName}
                    error={errors.firstName}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="lastName"
                    label="Last Name"
                    value={lastName}
                    error={errors.lastName}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="password"
                    label="Password"
                    type="password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="address"
                    label="Address"
                    value={address}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="location"
                    label="Location"
                    value={location}
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

export default AddUserForm;
