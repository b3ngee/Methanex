import React from 'react';
import { portfolio } from '../styles/portfolio.scss';
import Table from './Table.js';
import axios from 'axios';
import Button from './Button';
import { Link } from 'react-router-dom';
import { SUPER_ADMIN, prodAPIEndpoint } from '../constants/constants';
import { sanitizeRagStatus } from '../utils/sanitizer';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            classifications: {},
            portfolios: []
        };
    }

    componentDidMount() {
        this.fetchClassifications();
    }

    fetchClassifications() {
        axios.get(prodAPIEndpoint + '/classifications', {headers: {Pragma: 'no-cache'}}).then(response => {
            this.setState({ classifications: response.data });
        }).then(() => {
            this.fetchPortfolios();
        });
    }

    fetchPortfolios() {
        const roles = localStorage.getItem('roles');
        const isAdmin = roles.includes(SUPER_ADMIN);
        let query;
        if (isAdmin) {
            query = '/portfolios';
        } else {
            query = '/portfolios?managerId=' + localStorage.user_id;
        }

        axios.get(prodAPIEndpoint + query, {headers: {Pragma: 'no-cache'}}).then(response => {
            const dataRows = response.data.map(d => {
                return {
                    'ID': d.id,
                    'Portfolio Name': d.name,
                    'Classification': this.state.classifications.filter(c => {
                        return c.id === d.classificationId;
                    })[0].name,
                    'Manager': d.managerId,
                    'Status': sanitizeRagStatus(d.ragStatus)
                };
            });
            this.setState({ portfolios: response.data, rows: dataRows });
        });
    }

    render() {
        let columns = ['ID', 'Portfolio Name', 'Classification', 'Status'];
        const rows = this.state.rows;

        return (
            <div className={ portfolio }>
                <h1>My Portfolios</h1>
                <h3>Number of portfolios: {this.state.rows.length}</h3>
                <p>Click on portfolio name to see more details</p>
                <Table columns={columns} rows={this.state.rows}/>

                <span>
                    <Link to={{pathname: '/portfolio/report', state: {c: {columns}, r: {rows}}}}>
                        <Button
                            type="submit"
                            label="Create report"
                        />
                    </Link>
                </span>
                <span>
                    <Link to={{pathname: 'portfolio/add'}}>
                        <Button
                            type="submit"
                            label="Add New Portfolio"
                        />
                    </Link>
                </span>
            </div>
        );
    }
}

export default Portfolio;
