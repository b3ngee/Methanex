import React from 'react';
import { select } from '../styles/dropdown.scss';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Mohan Gina'};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        alert('Redirecting to another page on topic: ' + this.state.value);
    }

    render() {
        return (
            <div>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="Iris Ananta">Iris Ananta</option>
                    <option value="Hilja Bethney">Hilja Bethney</option>
                    <option value="Darryl Diane">Darryl Diane</option>
                    <option value="Luca Drustan">Luca Drustan</option>
                    <option value="Krishna Erwin">Krishna Erwin</option>
                    <option value="Mohan Gina">Mohan Gina</option>
                    <option value="Gladys Lara">Gladys Lara</option>
                    <option value="Heinrich Katarina">Heinrich Katarina</option>
                    <option value="Erlend Noreen">Erlend Noreen</option>
                    <option value="Jerrik Oscar">Jerrik Oscar</option>
                    <option value="Nephthys Serhan">Nephthys Serhan</option>
                    <option value="Fionnbarra Silvester">Fionnbarra Silvester</option>
                    <option value="Tattoo Walther">Tattoo Walther</option>
                </select>
            </div>
        );
    }
}
