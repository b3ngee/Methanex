import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import axios from 'axios';
import isValidEmail from '../utils/validationHelpers';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        if (!this.state.email) {
            this.setState({ errors: { email: 'email is required' }});
            return false;
        }
        if (!isValidEmail(this.state.email)) {
            this.setState({ errors: { email: 'email format is invalid' }});
            return false;
        }
        if (!this.state.password) {
            this.setState({errors: { password: 'password is required'}});
            return false;
        }
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        // TODO: currently mocking api call with apiary, will need to change
        // this method depending on api response
        if (this.isValid()) {
            axios.post('https://private-3bb33-methanex.apiary-mock.com/login', {
                email: this.state.email,
                pw: this.state.password
            }).then((res) => {
                localStorage.setItem('user_id', res.data.user_id);
                localStorage.setItem('roles', res.data.roles);
                localStorage.setItem('user_name', res.data.user_name);
                this.props.history.push('/');
            }).catch(
                // TODO: display error message once api format is finalized
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, email, password, isLoading } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

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

                <div className="form-group">
                    <button className="loginButton" disabled={isLoading}>Login</button>
                </div>
            </form>
        );
    }
}

Login.propTypes = {
    history: React.PropTypes.object
};

export default Login;
