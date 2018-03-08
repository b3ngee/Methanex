import React from 'react';
import { project } from '../styles/project.scss';
import Table from './Table.js';
import axios from 'axios';
// import Button from './Button';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfProjects: [],
            projects: [],
        };
        this.listProjects = this.listProjects.bind(this);
    }

    componentDidMount() {
        this.listProjects();
    }

    listProjects() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/portfolios').then(response => {
            const data = [];
            this.setState({listOfProjects: response.data});
            console.log('this is the response data');
            console.log(response.data);
            const len = response.data.length;
            for (let i = 0; i < len; i++) {
                data.push({ 'ID': this.state.listOfProjects[i].portfolio_id, 'Portfolio Name': this.state.listOfProjects[i].portfolio_name});
            }
            this.setState({projects: data});
        }).catch(()=>{

        });
    }

    navToAddPortfolioPage() {
        window.location.assign('/portfolioNew/addNewPortfolio');
        console.log('new page');
    }

    render() {
        let columns = ['ID', 'Portfolio Name'];
        return (
            <div className={ project }>
                <h1>Hello {localStorage.getItem('user_name')}</h1>
                <button onClick={this.navToAddPortfolioPage}/>
                <p>{"Here's an overview of your portfolios."}</p>
                <div>
                    <Table columns={columns} rows={this.state.projects}/>
                </div>
            </div>
        );
    }
}

export default Portfolio;
