import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { reportingModule } from '../styles/reportingModule.scss';
// import { PDF } from '../styles/pdf.scss';
import { ReactTableDefaults } from 'react-table';

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10
});

export default class ReportingModule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cols = this.props.location.state.c.columns;
        const rows = this.props.location.state.r.rows;

        const pdfStyle = {
            width: '95%',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

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
                <h1>Reporting Module</h1>
                <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css"/>
                <span>
                    <div>
                        <div className="mt4" style={ pdfStyle }>
                            <div><ReactTable filterable data={data} columns={columns}/></div>
                        </div>
                    </div>
                </span>
            </div>
        );
    }
}

ReportingModule.propTypes = {
    columns: PropTypes.any,
    rows: PropTypes.any,
    location: PropTypes.any
};
