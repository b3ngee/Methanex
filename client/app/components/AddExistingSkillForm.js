import React, {PropTypes} from 'react';
import Dropdown from './Dropdown';
import { formBox } from '../styles/form.scss';
import { COMPETENCY } from '../constants/constants.js';
import Button from './Button';
import axios from 'axios';

class AddExistingSkillForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.data);
        console.log(this.props.location.state.data[0].Value);
        this.state = {
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
    }

    componentDidMount() {
        this.getSkillCategories();
    }

    getSkillCategories() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-categories').then((response) => {
            this.setState({ skillCategoryData: response.data });
        });
    }

    getSkillTypes() {
        axios.get('https://methanex-portfolio-management.herokuapp.com/skill-types?skillCategoryId=' + this.state.skillCategoryId).then( (response) => {
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
            axios.post('https://methanex-portfolio-management.herokuapp.com/user-skills?userId=' + this.state.userId, {
                userId: this.state.userId,
                skillTypeId: this.state.skillTypeId,
                competency: this.state.skillCompetency
            }).then( (response) => {
                if (response.status === 201) {
                    // TODO: this should go back to the last page
                    this.props.history.push('/');
                }
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, skillCategoryData, skillTypeData } = this.state;

        return (
            <div className={ formBox }>
                <form onSubmit={this.onSubmit}>
                    <h2> Add new skill</h2>

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
                        label="Create New Skill"
                    />
                </form>
            </div>
        );
    }
}

AddExistingSkillForm.propTypes = {
    history: React.PropTypes.any,
    userId: React.PropTypes.string.isRequired,
    data: PropTypes.any,
    location: PropTypes.any,
    match: PropTypes.any
};

export default AddExistingSkillForm;
