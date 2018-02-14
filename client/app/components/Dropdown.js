import React, { Component, PropTypes } from 'react';
import { select } from '../styles/dropdown.scss';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const values = this.props.data.projectNames;

        let options = values.map(val => {
            return <option value = {val}>{val}</option>;
        });

        return (
            <div>
                <select value={this.state.value} onChange={this.handleChange}>
                    {options}
                </select>
            </div>
        );
    }
}

Dropdown.propTypes = {
    data: PropTypes.any
};
