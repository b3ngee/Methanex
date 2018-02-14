import React, { Component, PropTypes } from 'react';
import { select } from '../styles/dropdown.scss';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let options = this.props.data.map(val => {
            return <option value = {val}>{val}</option>;
        });

        return (
            <div>
                <select onChange={this.handleChange}>
                    {options}
                </select>
            </div>
        );
    }
}

Dropdown.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
};
