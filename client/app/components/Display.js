import React, { Component } from 'react';
import Routes from '../routes';
import { display } from '../styles/display.scss';

class Display extends Component {
    render() {
        return (
            <div className={ display }>
                { Routes }
            </div>
        );
    }
}

export default Display;
