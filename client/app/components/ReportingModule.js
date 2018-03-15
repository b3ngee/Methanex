import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { reportingModule } from '../styles/reportingModule.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { PDF } from '../styles/pdf.scss';
import { ReactTableDefaults } from 'react-table';

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10
});

export default class ReportingModule extends Component {
    constructor(props) {
        super(props);
    }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save('download.pdf');
            })
        ;
    }

    render() {
        const cols = this.props.location.state.c.columns;
        const rows = this.props.location.state.r.rows;

        const pdfStyle = {
            backgroundColor: '#f5f5f5',
            width: '210mm',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

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
                <span>
                    <div>
                      <div className="mb5">
                        <button onClick={this.printDocument}>Download Report</button>
                      </div>
                          <div id="divToPrint" className="mt4" style={ pdfStyle }>
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
