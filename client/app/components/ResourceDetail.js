import React from 'react';
import Table from './Table.js';
import { resource } from '../styles/resource.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './Button.js';

class ResourceDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            skillsRows: [],
            userSkillIds: [],
            skillTypeData: {},
            skillCategoryData: {}
        };

        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getSkillCategories();
    }

    // TODO: need to fix up the apiary call
    getDetails() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users/' + this.props.match.params.resource_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            const rows = [];
            const data = response.data;
            for (const key in data) {
                if(key !== null && typeof data[key] === 'boolean') {
                    rows.push({'Header': key, 'Value': data[key] + ''});
                } else if (key !== null) {
                    rows.push({'Header': key, 'Value': data[key]});
                }
            }
            this.setState({rows: rows});
        }).catch( () => {
        });
    }

    getSkillCategories() {
         axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories', {headers: {Pragma: 'no-cache'}}).then( (response) => {
             this.setState({ skillCategoryData: response.data });
             this.getSkillTypes();
         });
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types', {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ skillTypeData: response.data });
            this.getUserSkills();
        });
    }

    getUserSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.props.match.params.resource_id, {headers: {Pragma: 'no-cache'}}).then(response => {
            const data = response.data;
            const numSkill = response.data.length;
            const skillsRows = [];
            let rowNum = 0;
            for (let i = 0; i < numSkill; i++) {
                for(let j = 0; j < this.state.skillTypeData.length; j++) {
                    if (this.state.skillTypeData[j].id === data[i].skillTypeId) {
                        for(let k = 0; k < this.state.skillCategoryData.length; k++) {
                            if (this.state.skillCategoryData[k].id === this.state.skillTypeData[j].skillCategoryId) {
                                this.state.userSkillIds.push(data[i].id);
                                skillsRows.push({
                                    'ID': rowNum + 1,
                                    'Skill Category': this.state.skillCategoryData[k].name,
                                    'Skill Name': this.state.skillTypeData[j].name,
                                    'Skill Competency': data[i].competency
                                });
                                rowNum++;
                            }
                        }
                    }
                }
            }
            this.setState({ skillsRows: skillsRows});
        }).catch( () => {
        });
    }

    render() {
        let columns = ['Header', 'Value'];
        let skillsColumns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        const data = this.state.rows;
        const skillsData = this.state.skillsRows;
        const skillIdsData = this.state.userSkillIds;
        return (
            <div className={ resource }>
                <h1>Resource Details</h1>
                <Table text="Resource Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/resource/edit', state: {data}}}>
                        <Button label="Edit"/>
                    </Link>
                </span>
                <Table text="Resource Skills" columns={skillsColumns} rows={skillsData} />
                <Link to = {{pathname: '/skill/add', state: {data}}}>
                    <Button
                        type="submit"
                        label="Add Skill"
                    />
                </Link>
                <Link to = {{pathname: '/skill/edit', state: {skillsData, skillIdsData, data}}}>
                    <Button
                        type="submit"
                        label="Edit Skills"
                    />
                </Link>
            </div>
        );
    }

}

ResourceDetail.propTypes = {
    match: React.PropTypes.any
};

export default ResourceDetail;
