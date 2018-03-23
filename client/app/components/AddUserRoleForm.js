import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import { prodAPIEndpoint, RESOURCE_MANAGER, SUPER_ADMIN, PORTFOLIO_MANAGER, RESOURCE, PROJECT_MANAGER } from '../constants/constants';

class AddUserRoleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            users: [],
            userId: '',
            role: '',
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getUsers();
        this.getUserRoles();
    }

    getUsers() {
        axios.get(prodAPIEndpoint + '/users', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({users: response.data});
        });
    }

    getUserRoles() {
        const roles_ = [{ id: RESOURCE_MANAGER, name: 'Resource Manager' }, { id: SUPER_ADMIN, name: 'Super Admin' }, { id: PORTFOLIO_MANAGER, name: 'Portfolio Manager' }, { id: RESOURCE, name: 'Resource' }, { id: PROJECT_MANAGER, name: 'Project Manager' }];
        this.setState({
            roles: roles_
        });
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
        if (this.isValid()) {
            axios.post(prodAPIEndpoint + '/user-roles', {
                userId: this.state.userId,
                role: this.state.role
            }).then((response) => {
                if (response.status === 201) {
                    this.setState({
                        userId: '',
                        role: '',
                        errors: {}, successModalOpen: true
                    });
                }
            }).catch((error) => {
                this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true });
            });
        }
    }

    handleSelect(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        const { roles, errors, successModalOpen, errorModalOpen, errorMessage } = this.state;

        const userObjects = this.state.users.map((uo) => {
            return {id: uo.id, name: uo.firstName + ' ' + uo.lastName};
        });
        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2>Assign Role to User</h2>
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
                        label="Select a User"
                        name="userId"
                        data={userObjects}
                        onSelect={this.handleSelect}
                        error={errors.userId}
                    />
                     <Dropdown
                         label="Select a Role"
                         name="role"
                         data={roles}
                         onSelect={this.handleSelect}
                         error={errors.role}
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
