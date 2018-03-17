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

    getDetails() {
        console.log('in getdetails');
        console.log(this.props.match.params.resource_id);
        axios.get('https://private-05c14-methanex.apiary-mock.com/resource/' + this.props.match.params.resource_id).then(response => {
            const rows = [];
            const data = response.data;
            console.log(data);
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

    getUserSkills() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.props.match.params.resource_id).then(response => {
            const skillsRows = [];
            const data = response.data;

            for (let i = 0; i < response.data.length; i++) {
                skillsRows.push({ 'Skill': this.state.skillsNames[data[i].skillTypeId], 'Competency': data[i].competency });
            }
            this.setState({skillsRows: skillsRows});
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
            </div>
        );
    }

}

ResourceDetail.propTypes = {
    match: React.PropTypes.any
};

export default ResourceDetail;
