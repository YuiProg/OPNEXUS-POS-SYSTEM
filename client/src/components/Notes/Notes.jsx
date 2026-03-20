import React from "react";
import './Notes.css';

class Notes extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>
                <h1>NOTES: </h1>
                <textarea name="" id="">
                    {/* TEXT HERE */}
                </textarea>
            </div>
        );
    }
}

export default Notes;