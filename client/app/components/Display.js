import React, { Component } from 'react';
import Routes from '../routes';
import { display } from '../styles/display.scss';
import Toolbar from './Toolbar';

class Display extends Component {
    render() {
        return (
            <div className={ display }>
                <Toolbar/>
                { Routes }
            </div>
        );
    }
}

export default Display;
