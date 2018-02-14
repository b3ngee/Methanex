import React, {Component} from 'react';
import { toolbar } from '../styles/toolbar.scss';
// import { Link } from 'react-router-dom';

class Toolbar extends Component {
    render() {
        return (
            <div className={ toolbar }>
                <ul>
                    <li className="text" style={{marginLeft: '1em', marginRight: '5em'}}>My Projects</li>

                    <li className="text" style={{marginLeft: '1em'}}>My Resouces</li>

                    <li className="text">My Hours</li>
                </ul>
            </div>
        );
    }
}

export default Toolbar;
