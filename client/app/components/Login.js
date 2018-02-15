import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../styles/login.scss';

const Login = () =>
    <div className={ login }>
        <h1>Please log in...</h1>
        <label htmlFor="user_name">
            Username:
            <input id="user_name" type="text"/>
        </label>
        <br/>
        <br/>
        <label htmlFor="pw">
            Password:
            <input id="pw" type="password"/>
        </label>
        <br/>
        <br/>
        <Link to="/portfolio">Login</Link>
    </div>;
export default Login;
