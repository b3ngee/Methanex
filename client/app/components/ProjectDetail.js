import React from 'react';
import Table from './Table.js';
import { project } from '../styles/project.scss';
import Navbar from './Navbar';

 // const id = localStorage.getItem('project_id');
 // change 2 to id after routing is set-up

class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        columns: ['Project Name', 'Project Manager', 'Status'],
        rows: [{
                  'Project Name': 'FB',
                  'Project Manager': 'Ben Gee',
                  'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
              }, {
                  'Project Name': 'GOOGLE',
                  'Project Manager': 'Ben Gee',
                  'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
              }, {
                  'Project Name': 'MSFT',
                  'Project Manager': 'Colby Song',
                  'Status': <img style={{width: 15, height: 20}} src={require('../images/greenLightBulb.png')} />
              }, {
                  'Project Name': 'TWITCH',
                  'Project Manager': 'Lansi Chu',
                  'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
              }, {
                  'Project Name': 'EA',
                  'Project Manager': 'Yoony Ok',
                  'Status': <img style={{width: 15, height: 20}} src={require('../images/redLightBulb.png')} />
              }, {
                  'Project Name': 'UBC',
                  'Project Manager': 'Harnoor Shoker',
                  'Status': <img style={{width: 15, height: 20}} src={require('../images/amberLightBulb.jpg')} />
              }]
        };
    }

    render() {
        return (
            <div className={ project }>
                <h1>Project Details</h1>
                <Navbar/>
                <Table text="Project Details" columns={this.state.columns} rows={this.state.rows}/>
            </div>
        );
    }

}

export default ProjectDetail;
