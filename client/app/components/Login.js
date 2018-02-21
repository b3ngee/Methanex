import React from 'react';
import TextFieldGroup from './TextFieldGroup';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {

    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <TextFieldGroup
                    field="identifier"
                    label="Username / Email"
                    value={identifier}
                    error={errors.identifier}
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

export default Login;
