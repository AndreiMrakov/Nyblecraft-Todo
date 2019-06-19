import React from 'react';
import SingleNote from "./SingleNote";

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='notes-container'>
                {this.props.notes.map(note => note.text &&
                    <SingleNote key={note.id} note={note} delete={this.props.delete} update={this.props.update}/>)}
            </div>
        );
    }
}

export default NoteList;