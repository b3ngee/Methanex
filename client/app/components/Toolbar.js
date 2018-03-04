import React, {Component} from 'react';
import { toolbar } from '../styles/toolbar.scss';

class Toolbar extends Component {
    render() {
        return (
            <div className={ toolbar }>
                <ul>
                    <li><a href="">My Projects</a></li>
                    <li><a href="">My Resources</a></li>
                    <li><a href="">My Hours</a></li>
                </ul>
            </div>
        );
    }
}

export default Toolbar;
