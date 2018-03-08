import React from 'react';
import { skill } from '../styles/skill.scss';
import Table from './Table';
import Button from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numSkill: 0,
            rows: []
        };
        this.getSkills = this.getSkills.bind(this);
    }

    componentDidMount() {
        this.getSkills();
    }

    // TODO: need to change the end points
    getSkills() {
        axios.get('https://private-3bb33-methanex.apiary-mock.com/skills?resourceId=').then(response => {
            this.setState({ numSkill: response.data.length });
            this.setState({ skills: response.data });

            const tableData = [];
            for (let i = 0; i < this.state.numSkill; i++) {
                tableData.push({ 'ID': i + 1, 'Skill Category': this.state.skills[i].skill_category_name, 'Skill Name': this.state.skills[i].skill_type_name, 'Skill Competency': this.state.skills[i].competency });
            }
            this.setState({ rows: tableData});
        }).catch( () => {
        });
    }

    render() {
        let columns = ['ID', 'Skill Category', 'Skill Name', 'Skill Competency'];
        return(
            <div className={ skill }>
                <h4>Skills</h4>
                <Table text="List of Skills" columns={columns} rows={this.state.rows}/>
                <Link to = "/addSkill">
                    <Button
                        type="submit"
                        label="Add Skill"
                    />
                </Link>
                <Link to = "/">
                     <Button
                         type="submit"
                         label="Edit Skill"
                     />
                 </Link>
                <Link to = "/">
                    <Button
                        type="submit"
                        label="Delete Skill"
                    />
                </Link>
            </div>
        );
    }
}

export default Skill;
