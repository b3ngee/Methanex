import React from 'react';
import Table from './Table.js';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import TextFieldGroup from './TextFieldGroup.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formBox } from '../styles/form.scss';
import { project } from '../styles/project.scss';

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
            resources: [],
            resourceId: '',
            assignedHours: '',
        };

        this.getDetails = this.getDetails.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getResourceData = this.getResourceData.bind(this);
        this.addResource = this.addResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getResourceData();
    }

    getDetails() {
    console.log(this.props.match.params.project_id);
        axios.get('https://methanex-portfolio-management.herokuapp.com/projects/' + this.props.match.params.project_id, {headers: {Pragma: 'no-cache'}})
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
        axios.get('https://methanex-portfolio-management.herokuapp.com/users?role=RESOURCE', {headers: {Pragma: 'no-cache'}})
        .then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = {'FirstName': response.data[i].firstName, 'LastName': response.data[i].lastName, 'Availability': response.data[i].status};
            }
            this.setState({resourceData: data});
            this.setState({resources: response.data});
        })
        .then(() => {
            this.getResources();
        });
    }

    getResources() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/project-resources?projectId=' + this.props.match.params.project_id, {headers: {Pragma: 'no-cache'}})
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addResource() {
        axios.post('https://methanex-portfolio-management.herokuapp.com/project-resources', {
            projectId: this.props.match.params.project_id,
            resourceId: this.state.resourceId,
            assignedHours: this.state.assignedHours,
        })
        .then(response => {
            if (response.status === 201) {
              this.getResourceData();
            }
        });
    }

    deleteResource() {
        let id;
        const rowResource = this.state.rowResource;
        for (let i = 0; i < rowResource.length; i++) {
            if (rowResource[i]['Resource ID'] + '' === this.state.resourceId) {
                id = rowResource[i].ID;
            }
        }
        axios.delete('https://methanex-portfolio-management.herokuapp.com/project-resources/' + id)
        .then(response => {
            if (response.status === 200) {
                this.getResourceData();
            }
        });
    }

    render() {
        let columns = ['Header', 'Value'];
        let resourceColumns = ['ID', 'Resource ID', 'First Name', 'Last Name', 'Assigned Hours', 'Availability'];

        const data = this.state.rows;
        const {resourceId, assignedHours} = this.state;
        const resourceObjects = this.state.resources.map(ro => {
            return { id: ro.id, name: ro.firstName };
        });

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
               <div className={ formBox }>
               <Dropdown
                    label="Resources"
                    name="resourceId"
                    data={resourceObjects}
                    preSelect={resourceId}
                    onSelect={this.onChange}
                />
                <TextFieldGroup
                    type="text"
                    field="assignedHours"
                    label="Assigned Hours (Only for Add Resource)"
                    value={assignedHours}
                    onChange={this.onChange}
                />
                </div>
                <Button
                    type="submit"
                    label="Add Resource"
                    onClick={this.addResource}
                />
                <Button
                    type="submit"
                    label="Delete Resource"
                    onClick={this.deleteResource}
                />
            </div>
        );
    }

}

ProjectDetail.propTypes = {
    match: React.PropTypes.any,
    history: React.PropTypes.any,
};

export default ProjectDetail;
