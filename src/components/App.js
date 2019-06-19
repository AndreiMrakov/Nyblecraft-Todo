import React from 'react';
import AddNote from "./AddNote";
import TagList from "./TagList";
import NoteList from "./NoteList";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            hashs: [],
            id: 0,
        };
    }

    componentWillMount() {
        // this.loadFile(localStorage);
    }

    loadFile = () => {

    };

    newNote = (note) => {
        let noteHash = note.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) !== null ? note.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) : null;
        let notesCopy = [...this.state.notes];
        let newNote = {
            id: this.state.id + 1,
            text: note,
            hash: noteHash,
        };
        notesCopy.push(newNote);

        if(noteHash){
            let hashsCopy = [...this.state.hashs];
            if(!hashsCopy.some(hash => hash.text === noteHash)){
                let newHash = {
                    owners: [].push(newNote.id),
                    text: noteHash,
                };
                hashsCopy.push(newHash);
            } else {
                let hashOwnerCopy = [...hashsCopy[hashsCopy.findIndex(hash => hash.text === noteHash)].owners];
                // console.log(hashsCopy.findIndex(hash => hash.text === noteHash));
                hashOwnerCopy.push(newNote.id);
                let newHash = {
                    owners: hashOwnerCopy,
                    text: noteHash,
                };
                hashsCopy.push(newHash);
            }
            this.setState({hashs: hashsCopy});
            console.log(hashsCopy.findIndex(hash => hash.text === noteHash[0]));

        }

        this.setState({notes: notesCopy, id: this.state.id + 1});
    };

    deleteNote = (id) => {
        let notesCopy = [...this.state.notes];
        notesCopy.forEach((note, index) => {
            if (note.id === id) {
                notesCopy.splice(index, 1, 0);
                this.setState({notes: notesCopy});
            }
        });
    };

    editNote = (id, text) => {
        let notesCopy = [...this.state.notes];
        notesCopy.forEach((note, index) => {
            if (note.id === id) {
                note.text = text;
                this.setState({notes: notesCopy});
            }
        });
    };

    render() {
        return (
            <div className='app-container'>
                <AddNote pusher={this.newNote}/>
                <TagList/>
                <NoteList notes={this.state.notes} delete={this.deleteNote} update={this.editNote}/>
            </div>
        );
    }
}

export default App;