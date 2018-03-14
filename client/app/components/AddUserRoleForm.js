import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

class AddUserRoleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            role: '',
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        if(!this.state.userId) {
            this.setState({ errors: { userId: 'UserID is required' }});
            return false;
        }
        if(!this.state.role) {
            this.setState({ errors: { role: 'Role type is required' }});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        // TODO: need to make apiary call for /newSkillType
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/user-roles', {
                userId: this.state.userId,
                role: this.state.role
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'userRole_added') {
                    this.setState({
                        userId: '',
                        role: '',
                        errors: {},
                    });
                }
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { userId, role, errors } = this.state;

        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2>Add New User Role</h2>

                    <TextFieldGroup
                        field="userId"
                        label="User ID"
                        value={userId}
                        error={errors.userId}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        field="role"
                        label="Assign Role"
                        value={role}
                        error={errors.role}
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

export default AddUserRoleForm;
