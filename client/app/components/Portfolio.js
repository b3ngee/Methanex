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
            classificationIDs: {},
            portfolioIDs: []
        };
        this.listProjects = this.listProjects.bind(this);
    }

    componentDidMount() {
        this.listClassifications();
    }

    listClassifications() {
        // TODO: need to filter for Portfolio Managers only
        axios.get('https://methanex-portfolio-management.herokuapp.com/classifications').then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = response.data[i].name;
            }
            this.setState({classificationIDs: data});
            console.log(this.state.classificationIDs);
        }).then(() => {
            this.listProjects();
        }).catch(()=>{
        });
    }

    listProjects() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/portfolios?managerId=' + localStorage.user_id).then(response => {
            const data = [];
            this.setState({listOfProjects: response.data});
            console.log(response.data);
            const len = response.data.length;
            const portfolioIDs = [];
            for (let i = 0; i < len; i++) {
                const cname = this.state.classificationIDs[this.state.listOfProjects[i].classificationId];
                data.push({ 'ID': this.state.listOfProjects[i].id, 'Portfolio Name': this.state.listOfProjects[i].name, 'Classification': cname});
                portfolioIDs.push(this.state.listOfProjects[i].portfolioId);
            }
            this.setState({rows: data});
            this.setState({portfolioIDs: portfolioIDs});
        }).catch(()=>{

        });
    }

    render() {
        let columns = ['ID', 'Portfolio Name', 'Classification'];
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
