import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { navbar } from '../styles/navbar.scss';
import { logout } from '../styles/logout.scss';
import '../styles/global.scss';

class Navbar extends Component {
    // TODO: conditionally render different links depending on roles retrieved from local storage
    constructor(props) {
        super(props);
    }

    logout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={ navbar }>
                <img src="https://i.imgur.com/gUCwlxg.png" />
                {
                    localStorage.getItem('user_id') &&
                    <div>
                        <Link to="/">My Profile</Link>
                        <Link to="/portfolio">Portfolios</Link>
                        <Link to="/project">Projects</Link>
                        <Link to="/resource">Resources</Link>
                        <Link to="/setting">Administration</Link>
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

