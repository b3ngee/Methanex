import React from 'react';

class AddUserForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('A user has been added');
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('https://private-05c14-methanex.apiary-mock.com/users', {
            method: 'POST',
            body: data,
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="user_name">
                    Name:
                    <input id="user_name" type="text" />
                </label>
                <br/>
                <br/>
                <label htmlFor="pw">
                    Password:
                    <input id="pw" type="text" />
                </label>
                <br/>
                <br/>
                <label htmlFor="email">
                    Email:
                    <input id="email" type="text" />
                </label>
                <br/>
                <br/>
                <label htmlFor="roles">
                    Roles:
                    <input id="roles" type="text" />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddUserForm;
