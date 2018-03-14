import React from 'react';
import { portfolio } from '../styles/portfolio.scss';
import Table from './Table.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfProjects: [],
            rows: [],
            portfolioIDs: []
        };
        this.listProjects = this.listProjects.bind(this);
    }

    componentDidMount() {
        this.listProjects();
    }

    listProjects() {
        axios.get('https://private-2a709-methanex.apiary-mock.com/portfolios?').then(response => {
            const data = [];
            this.setState({listOfProjects: response.data});

            const len = response.data.length;
            const portfolioIDs = [];
            for (let i = 0; i < len; i++) {
                data.push({ 'ID': this.state.listOfProjects[i].portfolio_id, 'Portfolio Name': this.state.listOfProjects[i].portfolio_name});
                portfolioIDs.push(this.state.listOfProjects[i].portfolio_id);
            }
            this.setState({rows: data});
            this.setState({portfolioIDs: portfolioIDs});
        }).catch(()=>{

        });
    }

    render() {
        let columns = ['ID', 'Portfolio Name'];
        const rows = this.state.rows;
        return (
            <div className={ portfolio }>
                <h1>Hello {localStorage.getItem('user_name')}</h1>
                <p>{"Here's an overview of your portfolios."}</p>
                <Table columns={columns} rows={this.state.rows} ids={this.state.portfolioIDs}/>
                <span>
                    <Link to={{pathname: '/portfolio/report', state: {c: {columns}, r: {rows}}}}>
                        <button>Create report</button>
                    </Link>
                </span>
                <br />
                <span>
                    <Link to={{pathname: 'portfolio/addnewportfolio'}}>
                        <button>Add New Portfolio</button>
                    </Link>
                </span>
            </div>
        );
    }
}

export default Portfolio;
