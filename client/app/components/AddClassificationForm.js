import React from 'react';
import axios from 'axios';
import TextFieldGroup from './TextFieldGroup';
import Button from './Button';
import { formBox } from '../styles/form.scss';

class AddClassificationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              classification: '',
              errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        if(!this.state.classification) {
            this.setState({ errors: { classification: 'Classification is required' }});
            return false;
        }

        return true;
    }

    onSubmit(e) {
        const config = {
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
            }
        };
        e.preventDefault();
        if (this.isValid()) {
            axios.post('https://methanex-portfolio-management.herokuapp.com/classifications', {
                name: this.classification
            }, config).then((response) => {
                if (response.status === 201) {
                    this.setState({
                    classification: '',
                    errors: {},
                    });
                }
            });
        }
    }

    onChange(e) {
            this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classification, errors } = this.state;

        return (
        <div className={ formBox }>
            <form onSubmit={this.onSubmit}>
                <h2>Add New Classification</h2>

                <TextFieldGroup
                    field="classification"
                    label="New Classification"
                    value={classification}
                    error={errors.classification}
                    onChange={this.onChange}
                />
                <Button
                    type="submit"
                    label="Submit"
                />
            </form>
        </div>
        );
    }
}

export default AddClassificationForm;
