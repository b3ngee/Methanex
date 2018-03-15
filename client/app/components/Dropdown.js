import React, { Component, PropTypes } from 'react';
import { select } from '../styles/dropdown.scss';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState: 'Select ... '
        };
    }

    render() {
        let options = this.props.data.map(val => {
            return <option value = {val}>{val}</option>;
        });

        return (
            <div>
                <label>{this.props.label}</label>
                {this.props.error && <span>{this.props.error}</span>}
                <select
                    onChange={this.props.controlFunc}
                >
                    value={this.props.value}
                    <option value = {this.state.initialState}>
                        {this.state.initialState} </option>
                    {options}
                </select>
            </div>
        );
    }
}

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: React.PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    controlFunc: PropTypes.func.isRequired
};
