import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { navbar } from '../styles/navbar.scss';

class Navbar extends Component {
    render() {
        return (
            <div className={ navbar }>
                <img src={require('../images/methanexlogo.png')} />
                <Link to="/">Home</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/resources">Resource</Link>
                <Link to="/settings">Settings</Link>
            </div>
        );
    }
}

export default Navbar;

