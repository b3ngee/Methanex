import React, {Component, PropTypes} from 'react';

let buttonStyle = {
    margin: '10px 10px 10px 0',
    fontSize: '18px',
    // background: '#2D88EE',
    borderWidth: 1,
    borderRadius: 100,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    title: 'PressME'
};

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                type="submit"
                className="btn btn-secondary"
                style={buttonStyle}
                onClick={() => {
                    return alert('Button is presseedddddd');
                }}>
                {this.props.text}
            </button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string
};


