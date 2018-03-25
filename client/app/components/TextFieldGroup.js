import React from 'react';
import { formGroup } from '../styles/textFieldGroup.scss';

const TextFieldGroup = ({ field, value, label, error, type, placeholder, onChange }) => {
    return (
        <div className={ formGroup } >
            <label>{label}</label>
            {error && <span>{error}</span>}
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                type={type}
                name={field}
            />
        </div>  );
};

TextFieldGroup.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
