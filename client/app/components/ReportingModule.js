import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { reportingModule } from '../styles/reportingModule.scss';
import { ReactTableDefaults } from 'react-table';
import { CSVLink } from 'react-csv';

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10
});

export default class ReportingModule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let reportType;
        const pathname = this.props.location.pathname;
        switch (pathname) {
            case '/project/report':
                reportType = 'projects_report.csv';
                break;
            case'/resource/report':
                reportType = 'resources_report.csv';
                break;
            case '/portfolio/report':
                reportType = 'portfolios_report.csv';
                break;
            default:
                reportType = 'report.csv';
        }
        const cols = this.props.location.state.c.columns;
        const rows = this.props.location.state.r.rows;

        const pdfStyle = {
            width: '95%',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px'
        };

        let data = rows;

        let columns = cols.map((colname) => {
            return {
                Header: colname,
                accessor: colname,
                Cell: props => <span>{props.value}</span>
            };
        });

        const csvStyle  = {
            backgroundColor: '#1AA7CC',
            fontSize: 14,
            fontWeight: 500,
            height: 52,
            padding: '10px',
            borderRadius: 5,
            color: '#fff',
            textDecoration: 'none'
        };

        return (
            <div className={ reportingModule }>
                <h1>Reporting Module</h1>
                <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css"/>
                <CSVLink data={this.props.location.state.r.rows} filename={reportType} style={csvStyle} >Download CSV</CSVLink>
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
