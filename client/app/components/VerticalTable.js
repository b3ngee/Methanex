import React, { Component, PropTypes } from 'react';
import { vtable } from '../styles/vtable.scss';

export default class VerticalTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headings = this.props.headings;
        const data = this.props.data;

        let body = headings.map((heading, i) => {
            return (
                <tr key={i}>
                    <th>{heading}:</th>
                    <th>{data[i]}</th>
                </tr>
            );
        });

        return (
            <table className={vtable}>
                <tbody>
                    {body}
                </tbody>
            </table>
        );
    }
}

VerticalTable.propTypes = {
    headings: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.string)
};

