import React, { Component } from 'react';
import { navbar } from '../styles/navbar.scss';
import '../styles/global.scss';

class EmptyNavbar extends Component {
    render() {
        return (
            <div className={ navbar }>
                <img src={require('../images/methanexlogo.png')} />
            </div>
        );
    }
}

export default EmptyNavbar;

