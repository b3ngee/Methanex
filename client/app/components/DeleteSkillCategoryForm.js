import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Button from './Button';
import { formBox } from '../styles/form.scss';
import PopupBox from './PopupBox';
import PopupBoxForDeletion from './PopupBoxForDeletion';
import { prodAPIEndpoint } from '../constants/constants';

class DeleteSkillCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillCategories: [],
            categoryID: '',
            errors: {},
            successModalOpen: false,
            errorModalOpen: false,
            deletionModalOpen: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
        this.handleDeletion = this.handleDeletion.bind(this);
        this.onCloseDeletion = this.onCloseDeletion.bind(this);
        this.onCancelDeletion = this.onCancelDeletion.bind(this);
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    getSkillCategories() {
        axios.get(prodAPIEndpoint + '/skill-categories', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({skillCategories: response.data});
        });
    }

    isValid() {
        let isValid = true;

        if (!this.state.categoryID) {
           this.setState({errors: { categoryID: 'Select a Skill Category' }});
           isValid = false;
        }
        return isValid;
    }

    handleDeletion() {
        this.setState({deletionModalOpen: true});
    }

    onSubmit() {
        if (this.isValid()) {
            axios.delete(prodAPIEndpoint + '/skill-categories/' + this.state.categoryID, {
                id: this.state.categoryID
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        categoryID: '',
                        errors: {},
                        deletionModalOpen: false,
                        successModalOpen: true
                    });
                }
            }).catch((error) => {
                this.setState({ errorMessage: 'Error: ' + error.response.data.message, errorModalOpen: true });
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    onCloseDeletion() {
        this.onSubmit();
    }

    onCancelDeletion() {
        this.setState({
            deletionModalOpen: false,
            errorMessage: 'deletion has been canceled',
            errorModalOpen: true
        });
//        window.history.back();
    }

    render() {
        const { skillCategories, deletionModalOpen, successModalOpen, errorModalOpen, errorMessage, errors } = this.state;

        return (
        <div className={ formBox }>
            <h2>Delete Skill Category</h2>
            <PopupBoxForDeletion
                label="Are you sure?"
                isOpen={deletionModalOpen}
                onClose={this.onCloseDeletion}
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
            <Dropdown
                label="Select a Skill Category to Delete"
                name="categoryID"
                data={skillCategories}
                onSelect={this.onChange}
                error={errors.categoryID}
            />
            <Button
                type="submit"
                label="Delete"
                onClick={this.handleDeletion}
            />
        </div>
        );
    }
}

export default DeleteSkillCategoryForm;
