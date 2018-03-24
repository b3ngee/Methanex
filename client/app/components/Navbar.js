import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { navbar } from '../styles/navbar.scss';
import { logout } from '../styles/logout.scss';
import {
    RESOURCE,
    RESOURCE_MANAGER,
    PORTFOLIO_MANAGER,
    PROJECT_MANAGER,
    SUPER_ADMIN
} from '../constants/constants';
import '../styles/global.scss';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    logout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        let isAdmin = false;
        let isPortfolioManager = false;
        let isResourceManager = false;
        let isProjectManager = false;
        let isResource = false;
        const roles = localStorage.getItem('roles');
        if (roles) {
            isAdmin = roles.includes(SUPER_ADMIN);
            isPortfolioManager = roles.includes(PORTFOLIO_MANAGER);
            isResourceManager = roles.includes(RESOURCE_MANAGER);
            isProjectManager = roles.includes(PROJECT_MANAGER);
            isResource = roles.includes(RESOURCE);
        }
        return (
            <div className={ navbar }>
                <img src="https://i.imgur.com/gUCwlxg.png" />
                {
                    localStorage.getItem('user_id') &&
                    <div>
                        <Link to="/">My Profile</Link>
                        { (isAdmin || isPortfolioManager) && <Link to="/portfolio">Portfolios</Link> }
                        { (isAdmin || isProjectManager || isPortfolioManager || isResource) && <Link to="/project">Projects</Link> }
                        { (isAdmin || isResourceManager) && <Link to="/resource">Resources</Link> }
                        { isAdmin && <Link to="/setting">Administration</Link> }
                        <div className={ logout } onClick={this.logout.bind(this)}> Log Out </div>
                    </div>
                }
            </div>
        );
    }
}

Navbar.propTypes = {
    history: React.PropTypes.object
};

export default withRouter(Navbar);

