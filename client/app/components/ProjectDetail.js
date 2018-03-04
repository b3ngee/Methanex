import React from 'react';
import Table from './Table.js';
import { project } from '../styles/project.scss';
import Navbar from './Navbar';
import axios from 'axios';

 // const id = localStorage.getItem('project_id');
 // change 2 to id after routing is set-up

class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };

        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails() {
    console.log('in getdetails');
        axios.get('https://private-2a709-methanex.apiary-mock.com/project/2').then(response => {
            const rows = [];
            const data = response.data;
            console.log(response.data);
            for (const key in data) {
                if(key !== null) {
                    rows.push({'key': key, 'value': data[key]});
                }
            }
            console.log(data);
            this.setState({rows: rows});
        }).catch( () => {
        });
    }

    render() {
        let columns = ['key', 'value'];
        return (
            <div className={ project }>
                <h1>Project Details</h1>
                <Navbar/>
                <Table text="Project Details" columns={columns} rows={this.state.rows}/>
            </div>
        );
    }

}

export default ProjectDetail;
