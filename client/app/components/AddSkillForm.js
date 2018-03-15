import React from 'react';
import AddSkillCategoryForm from './AddSkillCategoryForm';
import AddSkillTypeForm from './AddSkillTypeForm';

export default class AddSkillForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            skillType: ''
        };

        this.onCategorySubmit = this.onCategorySubmit.bind(this);
    }

    onCategorySubmit(category) {
        this.setState({ categories: category });
    }

    render() {
        return (
            <div>
                <AddSkillCategoryForm
                    onSubmit={this.onCategorySubmit}
                />
                <AddSkillTypeForm />
            </div>
        );
    }
}
