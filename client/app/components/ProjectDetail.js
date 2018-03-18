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
            resourceIDs: [],
            rowResource: [],
            resourceData: {},
        };

        this.getDetails = this.getDetails.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getResourceData();
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

    getResourceData() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users')
        .then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = {'FirstName': response.data[i].firstName, 'LastName': response.data[i].lastName, 'Availability': response.data[i].status};
            }
            this.setState({resourceData: data});
        })
        .then(() => {
            this.getResources();
        });
    }

    getResources() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/project-resources?projectId=' + this.props.match.params.project_id)
        .then(response => {
            const tableData = [];
            const resourceIDs = [];
            console.log(response.data);
            const userMap = this.state.resourceData;
            console.log(userMap);
            for (let i = 0; i < response.data.length; i++) {
                const uid = response.data[i].resourceId;
                tableData.push({ 'ID': response.data[i].id, 'Resource ID': response.data[i].resourceId, 'Assigned Hours': response.data[i].assignedHours, 'First Name': userMap[uid].FirstName, 'Last Name': userMap[uid].LastName, 'Availability': userMap[uid].Availability});
                resourceIDs.push(response.data[i].resourceId);
            }
            this.setState({rowResource: tableData});
            this.setState({resourceIDs: resourceIDs});
        });
    }

    render() {
        let columns = ['Header', 'Value'];
        let resourceColumns = ['ID', 'Resource ID', 'First Name', 'Last Name', 'Assigned Hours', 'Availability'];

        const data = this.state.rows;
        return (
            <div className={ project }>
                <h1>Project Details</h1>
                <Table text="Project Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/project/edit', state: {data}}}>
                        <Button type="submit" label="Edit"/>
                    </Link>
               </span>
               <Button type="submit" label="Delete" onClick={this.deleteProject}/>

               <h1>Resources</h1>
               <Table text="Project Details Resources" columns={resourceColumns} rows={this.state.rowResource}/>
            </div>
        );
    }

}

ProjectDetail.propTypes = {
    match: React.PropTypes.any,
    history: React.PropTypes.any,
};

export default ProjectDetail;
