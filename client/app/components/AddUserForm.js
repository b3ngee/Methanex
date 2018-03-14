import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import isValidEmail from '../utils/validationHelpers';
import { formBox } from '../styles/form.scss';

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
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/users', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                location: this.state.location,
                status: this.state.status,
                enabled: this.state.enabled,
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'user_created') {
                    console.log(response);
                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        address: '',
                        location: '',
                        status: '',
                        errors: {},
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
        const { firstName, lastName, email, password, address, location, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add new user</h2>

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
