import React from 'react';
import button from '../styles/button.scss';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, value, type, onClick, label, disabled } = this.props;
        return (
            <button
                name={id}
                value={value}
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={ button }
            >{label}
            </button>
        );
    }
}

Button.propTypes = {
    id: React.PropTypes.number,
    value: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
};

export default Button;


