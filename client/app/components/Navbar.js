import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { navbar } from '../styles/navbar.scss';
import { logout } from '../styles/logout.scss';
import '../styles/global.scss';

class Navbar extends Component {
    // TODO: conditionally render different links depending on roles retrieved from local storage
    logout() {
        localStorage.clear();
        location.reload();
    }

    render() {
        return (
            <div className={ navbar }>
                <img src={require('../images/methanexlogo.png')} />
                {
                    localStorage.getItem('user_id') &&
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/portfolio">Portfolios</Link>
                        <Link to="/project">Projects</Link>
                        <Link to="/resource">Resources</Link>
                        <Link to="/setting">Settings</Link>
                        <div className={ logout } onClick={this.logout}> Log Out </div>
                    </div>
                }
            </div>
        );
    }
}

export default Navbar;

