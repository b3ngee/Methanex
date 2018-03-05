import React, { Component, PropTypes } from 'react';
import { table } from '../styles/table.scss';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cols = this.props.columns;
        const rows = this.props.rows;

        // console.log('Columns: ', cols);
        // console.log('Rows: ', rows);

        let headers = (<thead>
            <tr>
              {cols.map(column => {
                  return <th>{column}</th>;
              })}
            </tr>
        </thead>);

        let body = rows.map(row => {
            return (
          <tr>
            {cols.map(column => {
                return <td>{row[column]}</td>;
            })}
          </tr>); });

        return (<table className={table} width="100%">
          {headers}
          {body}
        </table>);
    }
}

Table.propTypes = {
    columns: PropTypes.any,
    rows: PropTypes.any
};
