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
        this.deleteProject = this.deleteProject.bind(this);
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails() {
    console.log(this.props.match.params.project_id);
        axios.get('https://methanex-portfolio-management.herokuapp.com/projects/' + this.props.match.params.project_id)
        .then(response => {
            const rows = [];
            const data = response.data;
            console.log(response.data);
            for (const key in data) {
                if(key !== null) {
                    rows.push({'Header': key, 'Value': data[key]});
                }
            }
            console.log(data);
            this.setState({rows: rows});
        }).catch( () => {
        });
    }

    deleteProject() {
        const id = this.props.match.params.project_id;
        axios.delete('https://methanex-portfolio-management.herokuapp.com/projects/' + id)
        .then(response => {
            if (response.status === 200) {
                this.props.history.push('/project');
            }
        });
    }

    render() {
        let columns = ['Header', 'Value'];
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
               <Button label="Delete" onClick={this.deleteProject}/>
            </div>
        );
    }

}

ProjectDetail.propTypes = {
    match: React.PropTypes.any,
    history: React.PropTypes.any,
};

export default ProjectDetail;
