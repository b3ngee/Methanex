import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import axios from 'axios';
import isValidEmail from '../utils/validationHelpers';
import { formBox } from '../styles/form.scss';
import { prodAPIEndpoint } from '../constants/constants';
import PopupBox from './PopupBox';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            errorModalOpen: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    isValid() {
        if (!this.state.email) {
            this.setState({ errors: { email: 'Email is required' }});
            return false;
        }
        if (!isValidEmail(this.state.email)) {
            this.setState({ errors: { email: 'Email format is invalid' }});
            return false;
        }
        if (!this.state.password) {
            this.setState({errors: { password: 'Password is required'}});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post(`${prodAPIEndpoint}/login`, {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                localStorage.setItem('user_id', res.data.user.id);
                localStorage.setItem('roles', res.data.roles);
                localStorage.setItem('user_name', `${res.data.user.firstName} ${res.data.user.lastName}`);
                localStorage.setItem('email', res.data.user.email);
                this.props.history.push('/');
            }).catch((err) => {
                if (err.response.status === 400) {
                    this.setState({errors: {password: 'Incorrect password or email'}});
                } else if (err.response.status === 500) {
                    this.setState({
                        errorMessage: 'Backend Server Down, contact an admin',
                        projectDeletionModalOpen: false,
                        errorModalOpen: true
                    });
                }
             }
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { errors, email, password, isLoading, errorModalOpen, errorMessage } = this.state;

        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h1>Login to Your Account</h1>
                    <PopupBox
                        label={errorMessage}
                        isOpen={errorModalOpen}
                        onClose={this.onCloseError}
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
                        value={password}
                        error={errors.password}
                        onChange={this.onChange}
                        type="password"
                    />
                    <Button
                        type="submit"
                        label="Login"
                        disabled={isLoading}
                    />
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    history: React.PropTypes.object
};

export default Login;
