import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { navbar } from '../styles/navbar.scss';
import '../styles/global.scss';

class Navbar extends Component {
    render() {
        return (
            <div className={ navbar }>
                <img src={require('../images/methanexlogo.png')} />
                <Link to="/">Home</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/project">Projects</Link>
                <Link to="/resource">Resource</Link>
                <Link to="/setting">Settings</Link>
            </div>
        );
    }
}

export default Navbar;

