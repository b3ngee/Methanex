import React from 'react';
import Table from './Table.js';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import TextFieldGroup from './TextFieldGroup.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formBox } from '../styles/form.scss';
import { project } from '../styles/project.scss';
import { sanitizeProjectStatus, sanitizeRagStatus } from '../utils/sanitizer';
import PopupBox from './PopupBox';
import PopupBoxTwoButtons from './PopupBoxTwoButtons';
import {RESOURCE, RESOURCE_MANAGER, prodAPIEndpoint, PORTFOLIO_MANAGER} from '../constants/constants';
import { requestSection, title } from '../styles/requestSection.scss';

class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            rowResource: [],
            resourceData: {},
            allResources: [],
            resources: [],
            resourceId: '',
            assignedHours: '',
            successModalOpen: false,
            errorModalOpen: false,
            projectDeletionModalOpen: false,
            deletionModalOpen: false,
            roles: localStorage.getItem('roles'),
            projectResourceId: '',
            rowRequests: [],
            skillCategoryData: [],
            skillTypeData: [],
            skillTypeIds: {},
            userSkills: [],
            userSkillsData: [],
            allAvailableResources: [],
            filteredSkillTypeData: [],
            availableResourcesFilteredByCategory: [],
        };

        this.getDetails = this.getDetails.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getResourceData = this.getResourceData.bind(this);
        this.addResource = this.addResource.bind(this);
        this.deleteResourceOrRequest = this.deleteResourceOrRequest.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseProjectDeletion = this.onCloseProjectDeletion.bind(this);
        this.onCloseDeletion = this.onCloseDeletion.bind(this);
        this.onCancelDeletion = this.onCancelDeletion.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
        this.getSkillTypes = this.getSkillTypes.bind(this);
        this.getUserSkills = this.getUserSkills.bind(this);
        this.getFilteredSkillTypes = this.getFilteredSkillTypes.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getSkillCategories();
    }

    getSkillCategories() {
        axios.get(prodAPIEndpoint + '/skill-categories', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({ skillCategoryData: response.data });
            this.getSkillTypes();
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getSkillTypes() {
        axios.get(prodAPIEndpoint + '/skill-types', {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ skillTypeData: response.data });
            this.getUserSkills();
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getUserSkills() {
        axios.get(prodAPIEndpoint + '/user-skills', {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ userSkills: response.data });
            this.getResourceData();
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getDetails() {
        axios.get(prodAPIEndpoint + '/projects/' + this.props.match.params.project_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            axios.get(prodAPIEndpoint + '/users/' + response.data.managerId, {headers: {Pragma: 'no-cache'}}).then(managerRes => {
                axios.get(prodAPIEndpoint + '/portfolios/' + response.data.portfolioId, {headers: {Pragma: 'no-cache'}}).then(portfolioRes => {
                    const managerName = managerRes.data.firstName;
                    const portfolioName = portfolioRes.data.name;
                    const data = response.data;
                    const rows = [
                        {'Header': 'ID', 'Value': data.id},
                        {'Header': 'Portfolio Name', 'Value': portfolioName},
                        {'Header': 'Name', 'Value': data.name},
                        {'Header': 'Project Status', 'Value': sanitizeProjectStatus(data.projectStatus)},
                        {'Header': 'Status', 'Value': sanitizeRagStatus(data.ragStatus)},
                        {'Header': 'Budget ($)', 'Value': data.budget},
                        {'Header': 'Spent To Date ($)', 'Value': data.spentToDate},
                        {'Header': 'Estimate To Complete ($)', 'Value': data.estimateToComplete},
                        {'Header': 'Manager Name', 'Value': managerName},
                        {'Header': 'Complete', 'Value': data.complete ? 'True' : 'False'},
                        {'Header': 'Start Date', 'Value': data.startDate},
                        {'Header': 'End Date', 'Value': data.endDate},
                        {'Header': 'Gantt Chart', 'Value': data.ganttChart}
                    ];
                    this.setState({projectName: response.data.name});
                    this.setState({portfolioId: response.data.portfolioId});
                    this.setState({managerId: response.data.managerId});
                    this.setState({rows: rows});
                }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
            }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    handleDeleteProject() {
        this.setState({projectDeletionModalOpen: true});
    }

    deleteProject() {
        const id = this.props.match.params.project_id;
        axios.delete(prodAPIEndpoint + '/projects/' + id)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    projectDeletionModalOpen: false,
                    successModalOpen: true
                });
            }
        }).catch((error) => {
            this.setState({
                errorMessage: 'Error: ' + error.response.data.message,
                projectDeletionModalOpen: false,
                errorModalOpen: true
            });
        });
    }

    getResourceData() {
        axios.get(prodAPIEndpoint + '/users?role=RESOURCE', {headers: {Pragma: 'no-cache'}})
        .then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                // if (response.data[i].status === 'Available' && response.data[i].enabled === true) {
                    data[response.data[i].id] = {'FirstName': response.data[i].firstName, 'LastName': response.data[i].lastName, 'Availability': response.data[i].status};
                // }
            }
            this.setState({resourceData: data});
            this.setState({allResources: response.data});

            const temp = [];
            const anotherTemp = [];
            for (let i = 0; i < this.state.skillTypeData.length; i++) {
                    for (let j = 0; j < this.state.userSkills.length; j++) {
                        if (this.state.userSkills[j].skillTypeId === this.state.skillTypeData[i].id) {
                            anotherTemp.push({userId: this.state.userSkills[j].userId, skillType: this.state.skillTypeData[i].name, competency: this.state.userSkills[j].competency });
                        }
                    }
                    this.state.userSkillsData = anotherTemp;
            }
            this.state.skillTypeIds = temp;
            this.state.userSkillsData = anotherTemp;

            let testingLarger = [];
            let testingSmaller = [];
            const finalTesting = [];
            for (let j = 0; j < this.state.allResources.length; j++) {
                const testing = [];
                for (let i = 0; i < this.state.userSkillsData.length; i++) {
                    if (this.state.userSkillsData[i].userId === this.state.allResources[j].id) {
                        const skillName = this.state.userSkillsData[i].skillType;
                        const skillCompetency = this.state.userSkillsData[i].competency;
                        testing.push( ' ' + skillName + '(' + skillCompetency + ')');
                    }
                }
                testingSmaller = this.state.allResources[j];
                testingLarger = {basic: testingSmaller, skillsInfo: testing};
                finalTesting.push(testingLarger);
            }
            this.state.resources = finalTesting;
            this.state.allAvailableResources = finalTesting;
        })
        .then(() => {
            this.getResources();
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getResources() {
        axios.get(prodAPIEndpoint + '/project-resources?projectId=' + this.props.match.params.project_id, {headers: {Pragma: 'no-cache'}})
        .then(response => {
            const tableData = [];
            const rowRequests = [];
            const userMap = this.state.resourceData;
            for (let i = 0; i < response.data.length; i++) {
                const uid = response.data[i].resourceId;
                if (response.data[i].status === 'APPROVED') {
                    tableData.push({
                        'ID': response.data[i].id,
                        'Resource ID': response.data[i].resourceId,
                        'Assigned Hours': response.data[i].assignedHours,
                        'Name': userMap[uid].FirstName + ' ' + userMap[uid].LastName,
                        'Availability': userMap[uid].Availability,
                        'Remove': <Button
                                    id={response.data[i].id}
                                    type="submit"
                                    label="Remove"
                                    onClick={this.handleDelete}
                                />
                    });
                } else {
                    const status = response.data[i].status;
                    rowRequests.push({
                        'ID': response.data[i].id,
                        'Resource ID': response.data[i].resourceId,
                        'Name': userMap[uid].FirstName + ' ' + userMap[uid].LastName,
                        'Hours': response.data[i].assignedHours,
                        'Availability': userMap[uid].Availability,
                        'Status': status,
                        'Remove': <Button
                                    id={response.data[i].id}
                                    type="submit"
                                    label="Remove"
                                    onClick={this.handleDelete}
                                />
                    });
                }
            }
            this.setState({rowResource: tableData});
            this.setState({rowRequests: rowRequests});
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    getFilteredSkillTypes() {
            axios.get(prodAPIEndpoint + '/skill-types?skillCategoryId=' + this.state.skillCategoryId, {headers: {Pragma: 'no-cache'}}).then( (response) => {
                this.setState({ filteredSkillTypeData: response.data });
            }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'skillCategoryId') {
            this.state.skillCategoryId = e.target.value;
            this.getFilteredSkillTypes();
            if (e.target.value === '') {
                this.state.resources = this.state.allAvailableResources;
            } else {
                const temp = [];
                const anotherTemp = [];
                for (let i = 0; i < this.state.skillTypeData.length; i++) {
                    if (this.state.skillTypeData[i].skillCategoryId === Number(e.target.value)) {
                        temp.push(this.state.skillTypeData[i].id);
                        for (let j = 0; j < this.state.userSkills.length; j++) {
                            if (this.state.userSkills[j].skillTypeId === this.state.skillTypeData[i].id) {
                                anotherTemp.push({userId: this.state.userSkills[j].userId, skillType: this.state.skillTypeData[i].name, competency: this.state.userSkills[j].competency });
                            }
                        }
                        this.state.userSkillsData = anotherTemp; // get all user skills in this skill category
                    }
                }
                this.state.skillTypeIds = temp;
                this.state.userSkillsData = anotherTemp;
                const tempResources = [];
                for (let j = 0; j < this.state.allResources.length; j++) {
                    for (let k = 0; k < this.state.userSkillsData.length; k++) {
                        if (this.state.userSkillsData[k].userId === this.state.allResources[j].id) {
                            tempResources.push(this.state.allResources[j]);
                            break;
                        }
                    }
                }
                this.state.resources = tempResources;
                let testingLarger = [];
                let testingSmaller = [];
                const finalTesting = [];
                for (let j = 0; j < this.state.resources.length; j++) {
                    const testing = [];
                    for (let i = 0; i < this.state.userSkillsData.length; i++) {
                        if (this.state.userSkillsData[i].userId === this.state.resources[j].id) {
                            const skillName = this.state.userSkillsData[i].skillType;
                            const skillCompetency = this.state.userSkillsData[i].competency;
                            testing.push( ' ' + skillName + '(' + skillCompetency + ')');
                        }
                    }
                    testingSmaller = this.state.resources[j];
                    testingLarger = {basic: testingSmaller, skillsInfo: testing};
                    finalTesting.push(testingLarger);
                }
                this.state.resources = finalTesting;
                this.state.availableResourcesFilteredByCategory = finalTesting;
            }
        }

        if (e.target.name === 'skillTypeId') {
            if (e.target.value === '') {
                this.state.resources = this.state.availableResourcesFilteredByCategory;
            } else {
                const anotherTemp = [];
                for (let i = 0; i < this.state.filteredSkillTypeData.length; i++) {
                    if (this.state.filteredSkillTypeData[i].id === Number(e.target.value)) {
                        for (let j = 0; j < this.state.userSkills.length; j++) {
                            if (this.state.userSkills[j].skillTypeId === this.state.filteredSkillTypeData[i].id) {
                                anotherTemp.push({userId: this.state.userSkills[j].userId, skillType: this.state.filteredSkillTypeData[i].name, competency: this.state.userSkills[j].competency });
                            }
                        }
                        this.state.userSkillsData = anotherTemp;
                        break;
                    }
                }
                this.state.userSkillsData = anotherTemp;
                const tempResources = [];
                for (let j = 0; j < this.state.allResources.length; j++) {
                    for (let k = 0; k < this.state.userSkillsData.length; k++) {
                        if (this.state.userSkillsData[k].userId === this.state.allResources[j].id) {
                            tempResources.push(this.state.allResources[j]);
                            break;
                        }
                    }
                }
                this.state.resources = tempResources;
                let testingLarger = [];
                let testingSmaller = [];
                const finalTesting = [];
                for (let j = 0; j < this.state.resources.length; j++) {
                    const testing = [];
                    for (let i = 0; i < this.state.userSkillsData.length; i++) {
                        if (this.state.userSkillsData[i].userId === this.state.resources[j].id) {
                            const skillName = this.state.userSkillsData[i].skillType;
                            const skillCompetency = this.state.userSkillsData[i].competency;
                            testing.push( ' ' + skillName + '(' + skillCompetency + ')');
                        }
                    }
                    testingSmaller = this.state.resources[j];
                    testingLarger = {basic: testingSmaller, skillsInfo: testing};
                    finalTesting.push(testingLarger);
                }
                this.state.resources = finalTesting;
            }
        }
    }

    addResource() {
        axios.post(prodAPIEndpoint + '/project-resources', {
            projectId: this.props.match.params.project_id,
            resourceId: this.state.resourceId,
            assignedHours: this.state.assignedHours,
            status: 'PENDING'
        })
        .then(response => {
            if (response.status === 201) {
              this.getResourceData();
              this.setState({ successModalOpen: true });
            }
        }).catch( (error) => { this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true }); });
    }

    handleDelete(e) {
        this.setState({
            deletionModalOpen: true,
            projectResourceId: e.target.name
        });
    }

    onCloseDeletion() {
        this.deleteResourceOrRequest();
    }

    handleDelete(e) {
        this.setState({
            deletionModalOpen: true,
            projectResourceId: e.target.name
        });
    }

    deleteResourceOrRequest() {
        const id = this.state.projectResourceId;
        axios.delete(prodAPIEndpoint + '/project-resources/' + id)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    deletionModalOpen: false,
                    successModalOpen: true
                });
            }
        }).catch((error) => {
            this.setState({
                errorMessage: 'Error: ' + error.response.data.message,
                deletionModalOpen: false,
                errorModalOpen: true
            });
        });
    }

    onCloseSuccess() {
        this.getResources();
        this.setState({ successModalOpen: false });
    }

    onCloseProjectDeletion() {
        this.deleteProject();
    }

    onCancelDeletion() {
        this.setState({
            projectDeletionModalOpen: false,
            deletionModalOpen: false,
            errorMessage: 'deletion has been canceled',
            errorModalOpen: true
        });
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    render() {
        let columns = ['Header', 'Value'];
        let resourceColumns = ['ID', 'Resource ID', 'Name', 'Assigned Hours', 'Availability', 'Remove'];
        let requestColumns = ['ID', 'Resource ID', 'Name', 'Hours', 'Availability', 'Status', 'Remove'];

        const data = this.state.rows;
        const data2 = {'managerId': this.state.managerId, 'portfolioId': this.state.portfolioId, 'projectName': this.state.projectName};
        const { assignedHours, projectDeletionModalOpen, deletionModalOpen, successModalOpen, errorModalOpen, errorMessage, skillCategoryData, filteredSkillTypeData} = this.state;
        const resourceObjects = this.state.resources.map(ro => {
            return { id: ro.basic.id, name: ro.basic.firstName, skillsInfo: ro.skillsInfo };
        });
        if (this.state.roles.split(',').includes(RESOURCE) || this.state.roles.includes(RESOURCE_MANAGER) || this.state.roles.includes(PORTFOLIO_MANAGER)) {
            return (
                <div className={ project }>
                    <h1>{this.state.projectName}</h1>
                    <h2>Project Details</h2>
                    <Table text="Project Details" columns={columns} rows={this.state.rows}/>
                    <PopupBox
                        label={errorMessage}
                        isOpen={errorModalOpen}
                        onClose={this.onCloseError}
                    />
                </div>
            );
        }
        return (
            <div className={ project }>
                <h1>{this.state.projectName}</h1>
                <h2>Project Details</h2>
                <Table text="Project Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/project/edit', state: {data}, state2: {data2}}}>
                        <Button type="submit" label="Edit"/>
                    </Link>
                </span>
                <PopupBoxTwoButtons
                    label="Are you sure?"
                    isOpen={projectDeletionModalOpen}
                    onClose={this.onCloseProjectDeletion}
                    onCancel={this.onCancelDeletion}
                />
                <PopupBox
                    label="Successful!"
                    isOpen={successModalOpen}
                    onClose={this.onCloseSuccess}
                />
                <PopupBox
                    label={errorMessage}
                    isOpen={errorModalOpen}
                    onClose={this.onCloseError}
                />
                <Button type="submit" label="Delete" onClick={this.handleDeleteProject}/>

                <h2>Resources</h2>
                <PopupBoxTwoButtons
                    label="Are you sure?"
                    isOpen={deletionModalOpen}
                    onClose={this.onCloseDeletion}
                    onCancel={this.onCancelDeletion}
                />
                {this.state.rowResource.length > 0 &&
                    <Table text="Project Details Resources" columns={resourceColumns} rows={this.state.rowResource}/>}
                {this.state.rowResource.length === 0 && <p>No resources are assigned under this project.</p>}

                <h2>Resource Requests</h2>
                {this.state.rowRequests.length > 0 &&
                    <Table text="Project Details Resource Request" columns={requestColumns} rows={this.state.rowRequests}/>}
                {this.state.rowRequests.length === 0 && <p>No requests or none are kept in history.</p>}

                <div className={requestSection} >
                    <div className={title}><h2>Request Resources</h2></div>
                    <h6>NOTE: Before requesting a resource who is already in your <i>Resources</i> table,<br/>
                    <i>remove</i> them from that table first, then request them here.</h6>
                    <div className={ formBox }>
                        <Dropdown
                             label="Filter by Skill Category"
                             name="skillCategoryId"
                             data={skillCategoryData}
                             onSelect={this.onChange}
                        />
                        <Dropdown
                             label="Filter by Skill Type"
                             name="skillTypeId"
                             data={filteredSkillTypeData}
                             onSelect={this.onChange}
                        />
                        <Dropdown
                            label="Available Resources"
                            name="resourceId"
                            data={resourceObjects}
                            onSelect={this.onChange}
                        />
                        <TextFieldGroup
                            type="text"
                            field="assignedHours"
                            label="Number of Hours"
                            value={assignedHours}
                            onChange={this.onChange}
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Add Resource"
                        onClick={this.addResource}
                    />
                </div>
            </div>
        );
    }

}

ProjectDetail.propTypes = {
    match: React.PropTypes.any,
    history: React.PropTypes.any,
};

export default ProjectDetail;
