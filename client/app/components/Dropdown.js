import React, { Component, PropTypes } from 'react';
import { dropDown } from '../styles/dropdown.scss';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState: 'Select ... '
        };
    }

    render() {
        const { label, name, data, preSelect, error, onSelect } = this.props;

        let options = data.map(val => {
            if (val.id === preSelect) {
                return <option selected key={val.id} value={val.id}>{val.name}</option>;
            }
            return <option key={val.id} value={val.id}>{val.name}</option>;
        });

        return (
            <div className={ dropDown }>
                <label>{label}</label>
                {error && <span>{error}</span>}
                <select name={name} onChange={onSelect}>
                    <option value="">
                        {this.state.initialState}
                    </option>
                    {options}
                </select>
            </div>
        );
    }
}

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: React.PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    preSelect: PropTypes.any,
    onSelect: PropTypes.func.isRequired
};
