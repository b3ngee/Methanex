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
            skillsNames: {}
        };

        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
        this.getSkillsNames();
    }

    // TODO: need to fix up the apiary call
    getDetails() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/users/' + this.props.match.params.resource_id).then(response => {
            const rows = [];
            const data = response.data;
            console.log(data);
            for (const key in data) {
                if(key !== null && typeof data[key] === 'boolean') {
                    rows.push({'Header': key, 'Value': data[key] + ''});
                } else if (key !== null) {
                    rows.push({'Header': key, 'Value': data[key]});
                }
            }
            console.log(data);
            this.setState({rows: rows});
        }).catch( () => {
        });
    }

    getUserSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.props.match.params.resource_id).then(response => {
            const skillsRows = [];
            const data = response.data;
            for (let i = 0; i < response.data.length; i++) {
                skillsRows.push({ 'Skill': this.state.skillsNames[data[i].skillTypeId], 'Competency': data[i].competency });
            }
            this.setState({skillsRows: skillsRows});
            console.log(skillsRows);
        }).catch( () => {
        });
    }

    getSkillsNames() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types').then(response => {
            const data = {};
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].id] = response.data[i].name;
            }
            this.setState({ skillsNames: data });
            this.getUserSkills();
        }).catch( () => {
        });
    }

    render() {
        let columns = ['Header', 'Value'];
        let skillsColumns = ['Skill', 'Competency'];
        const data = this.state.rows;
        console.log('Rhoda? ' + Object.values(this.state.skillsRows));
        return (
            <div className={ resource }>
                <h1>Resource Details</h1>
                <Table text="Resource Details" columns={columns} rows={this.state.rows}/>
                <span>
                    <Link to={{pathname: '/resource/edit', state: {data}}}>
                        <Button label="Edit"/>
                    </Link>
                </span>
                <Table text="Resource Skills" columns={skillsColumns} rows={this.state.skillsRows} />
                <Link to = {{pathname: '/skill/add', state: {data}}}>
                    <Button
                        type="submit"
                        label="Add Skill"
                    />
                </Link>
                <Link to = {{pathname: '/skill/edit', state: {data}}}>
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
