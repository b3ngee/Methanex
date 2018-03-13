import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { reportingModule } from '../styles/reportingModule.scss';

export default class ReportingModule extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cols = this.props.location.state.c.columns;
        const rows = this.props.location.state.r.rows;

         console.log('Columns: ', cols);
         console.log('Rows: ', rows);

        let data = rows;

        let columns = cols.map((colname) => {
            return {
                Header: colname,
                accessor: colname,
                Cell: props => <span>{props.value}</span>
            };
        });

        return (
            <div className={ reportingModule }>
                <h1>Reporting module</h1>
                <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css"/>
                <ReactTable filterable data={data} columns={columns}/>
            </div>
        );
    }
}

ReportingModule.propTypes = {
    columns: PropTypes.any,
    rows: PropTypes.any,
    location: PropTypes.any
};
