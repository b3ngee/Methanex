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
        };

        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails();
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

    render() {
        let columns = ['Header', 'Value'];
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
            </div>
        );
    }

}

ResourceDetail.propTypes = {
    match: React.PropTypes.any
};

export default ResourceDetail;
