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
        e.preventDefault();
        // TODO: need to make apiary call for /classifications
        if (this.isValid()) {
            axios.post('https://private-3bb33-methanex.apiary-mock.com/classifications', {
                classification: this.classification
            }).then((response) => {
                if (response.status === 201 && response.data.status === 'classification_added') {
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
