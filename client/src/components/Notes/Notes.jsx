import React from "react";
import './Notes.css';

class Notes extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className="notes-container">
                <h1 className="notes-label">Notes: </h1>
                <textarea className="notes-text">
                    {/* TEXT HERE */}
                </textarea>
            </div>
        );
    }
}

export default Notes;