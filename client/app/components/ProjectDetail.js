import React from 'react';
import Table from './Table.js';
import Button from './Button.js';
import { project } from '../styles/project.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    console.log(this.props.match.params.project_id);
        axios.get('https://private-2a709-methanex.apiary-mock.com/project/' + this.props.match.params.project_id).then(response => {
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
        const data = this.state.rows;
        return (
            <div className={ project }>
                <h1>Project Details</h1>
                <Table text="Project Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/project/edit', state: {data}}}>
                        <Button label="Edit"/>
                    </Link>
               </span>
            </div>
        );
    }

}

ProjectDetail.propTypes = {
    match: React.PropTypes.any
};

export default ProjectDetail;
