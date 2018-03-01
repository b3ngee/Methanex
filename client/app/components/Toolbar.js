import React, {Component} from 'react';
import { toolbar } from '../styles/toolbar.scss';
import { Link } from 'react-router-dom';

class Toolbar extends Component {
    render() {
        return (
            <div className={ toolbar }>
                <ul>
                    <li className="text" style={{marginLeft: '0em', marginRight: '0em'}}>
                        <Link to = "/standardUser">My Skills</Link>
                    </li>

                    <li className="text" style={{marginLeft: '0em'}}>
                        <Link to = "/">My Projects</Link>
                    </li>

                    <li className="text" style={{marginLeft: '0em'}}>
                        <Link to = "/">My Resources</Link>
                    </li>

                    <li className="text">
                        <Link to = "/">My Hours</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Toolbar;
