import React, { Component, PropTypes } from 'react';
import { select } from '../styles/dropdown.scss';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = this.props.data.map(val => {
            return <option value = {val}>{val}</option>;
        });

        return (
            <div>
                <select
                    onChange={this.props.controlFunc}
                >
                    {options}
                </select>
            </div>
        );
    }
}

Dropdown.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    controlFunc: PropTypes.func.isRequired
};
