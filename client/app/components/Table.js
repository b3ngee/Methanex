import React, { Component, PropTypes } from 'react';
import { table } from '../styles/table.scss';
import {Link} from 'react-router-dom';

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
            let id;
            return (
                <tr>
                {cols.map(column => {
                    let endPoint = '';
                    if (column === 'ID') {
                        id = row[column];
                    }
                    if (column === 'Project Name') {
                        endPoint = 'project';
                    } else if (column === 'Resource Name') {
                        endPoint = 'resource';
                    } else if (column === 'Portfolio Name') {
                        endPoint = 'portfolio';
                    } if (endPoint !== '') {
                        return (
                            <td><Link to={`/${endPoint}/${id}`}>{row[column]}</Link></td>
                        );
                    }
                    return (<td>{row[column]}</td>);
                })}
                </tr>
             );
             }
        );

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
