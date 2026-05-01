import React from "react";
import './Notes.css';

class Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            notes: localStorage.getItem('notes') || ''
        };
    }
    handleChange = (e) => {
        const notes = e.target.value;
        this.setState({ notes });
        // Auto-save to localStorage
        localStorage.setItem('notes', notes);
    }

    render () {
        return (
            <div className="notes-container">
                <h1 className="notes-label">Notes: </h1>
                <textarea 
                    className="notes-text"
                    value={this.state.notes}
                    onChange={this.handleChange}
                    spellcheck="false"
                />
            </div>
        );
    }
}

export default Notes;