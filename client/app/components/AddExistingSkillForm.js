import React, {PropTypes} from 'react';
import Dropdown from './Dropdown';
import { formBox } from '../styles/form.scss';
import { COMPETENCY } from '../constants/constants.js';
import Button from './Button';
import axios from 'axios';
import PopupBox from './PopupBox';
import { prodAPIEndpoint } from '../constants/constants';

class AddExistingSkillForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successModalOpen: false,
            errorModalOpen: false,
            skillCategoryId: '',
            skillTypeId: '',
            skillCompetency: '',
            errors: {},
            skillCategoryData: [],
            skillTypeData: [],
            userId: this.props.location.state.data[0].Value
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
        this.onCloseSuccess = this.onCloseSuccess.bind(this);
        this.onCloseError = this.onCloseError.bind(this);
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    getSkillCategories() {
        axios.get(prodAPIEndpoint + '/skill-categories', {headers: {Pragma: 'no-cache'}}).then((response) => {
            this.setState({ skillCategoryData: response.data });
        });
    }

    getSkillTypes() {
        axios.get(prodAPIEndpoint + '/skill-types?skillCategoryId=' + this.state.skillCategoryId, {headers: {Pragma: 'no-cache'}}).then( (response) => {
            this.setState({ skillTypeData: response.data });
        });
    }

    onSelectCategory(e) {
        this.setState({ skillCategoryId: e.target.value }, this.getSkillTypes);
    }

    onSelect(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        let isValid = true;

        if (!this.state.skillCategoryId) {
            this.setState({ errors: { skillCategory: 'Skill category is required' }});
            isValid = false;
        }
        if (!this.state.skillTypeId) {
            this.setState({ errors: { skillType: 'Skill type is required' }});
            isValid =  false;
        }
        if (!this.state.skillCompetency) {
            this.setState({ errors: { skillCompetency: 'Skill competency is required'}});
            isValid = false;
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            axios.post(prodAPIEndpoint + '/user-skills?userId=' + this.state.userId, {
                userId: this.state.userId,
                skillTypeId: this.state.skillTypeId,
                competency: this.state.skillCompetency
            }).then( (response) => {
                if (response.status === 201) {
                    this.setState({ successModalOpen: true });
                }
            }).catch((error) => {
                this.setState({
                    errorMessage: 'Error: ' + error.response.data.message,
                    errorModalOpen: true
                });
            });
        }
    }

    onCloseSuccess() {
        window.history.back();
    }

    onCloseError() {
        this.setState({ errorModalOpen: false });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, skillCategoryData, skillTypeData, successModalOpen, errorModalOpen, errorMessage } = this.state;

        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2> Add new skill</h2>
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
                        label="Select a Category"
                        name="skillCategoryId"
                        data={skillCategoryData}
                        onSelect={this.onSelectCategory}
                        error={errors.skillCategory}
                    />
                    <Dropdown
                        label="Select a Skill"
                        name="skillTypeId"
                        data={skillTypeData}
                        onSelect={this.onSelect}
                        error={errors.skillType}
                    />
                    <Dropdown
                        label="Select a Competency Level"
                        name="skillCompetency"
                        data={COMPETENCY}
                        onSelect={this.onSelect}
                        error={errors.skillCompetency}
                    />
                    <Button
                        type="submit"
                        label="Add New Skill"
                    />
                </form>
            </div>
        );
    }
}

AddExistingSkillForm.propTypes = {
    history: React.PropTypes.any,
    userId: React.PropTypes.string,
    data: PropTypes.any,
    location: PropTypes.any,
    match: PropTypes.any
};

export default AddExistingSkillForm;
