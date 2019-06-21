import React from 'react';
import AddNote from "./AddNote";
import TagList from "./TagList";
import NoteList from "./NoteList";
import AddTag from "./AddTag";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filteredNotes: [],
            tags: [],
            id: 0,
        };
    }

    componentWillMount() {
        // this.setState({filteredNotes: this.filterNotes()});
    }

    // filterNotes = (tag = null) => {
    //     return tag !== null ? [...this.state.notes].filter(note => note.tags.some(noteTag => tag.includes(noteTag))) : this.state.notes;
    // };

    newNote = (note) => {
        let noteTags = note.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) !== null ? note.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) : null;
        let notesCopy = [...this.state.notes];
        let newNote = {
            id: this.state.id + 1,
            text: note,
            tags: noteTags,
        };
        notesCopy.push(newNote);

        if (noteTags !== null) {
            let tagsCopy = [...this.state.tags];
            for (let i = 0; i < noteTags.length; i++) {
                if (!tagsCopy.length) {
                    let newTag = {
                        owners: [newNote.id],
                        text: noteTags[i],
                    };
                    tagsCopy.push(newTag);
                } else {
                    for (let j = 0; j < tagsCopy.length; j++) {
                        if (noteTags[i] === tagsCopy[j].text && !tagsCopy[j].owners.includes(newNote.id)) {
                            tagsCopy[j].owners = [...tagsCopy[j].owners, newNote.id];
                        } else if (!tagsCopy.some(tag => tag.text === noteTags[i])) {
                            let newTag = {
                                owners: [newNote.id],
                                text: noteTags[i],
                            };
                            tagsCopy.push(newTag);
                        }
                    }
                }
            }
            this.setState({tags: tagsCopy});
        }
        this.setState({notes: notesCopy, id: this.state.id + 1});
    };

    deleteNote = (id) => {
        let notesCopy = [...this.state.notes];
        notesCopy.forEach((note, index) => {
            if (note.id === id) {
                notesCopy.splice(index, 1);
                this.setState({notes: notesCopy});
            }
        });
    };

    editNote = (id, text) => {
        let notesCopy = [...this.state.notes];
        notesCopy.forEach(note => {
            if (note.id === id) {
                note.text = text;
                this.setState({notes: notesCopy});
            }
        });
    };

    newTag = (tags) => {
        let newTags = [];
        tags.forEach(tag => {
            let tagsCopy = [...this.state.tags].map(tag => tag.text);
           if(!tagsCopy.includes(tag)){
               let newTag = {
                   text: tag,
                   owners: [],
               };
               newTags = [...newTags, newTag];
           }
        });
        this.setState({tags: [...this.state.tags, ...newTags]});
    };

    deleteTag = (name) => {
        let tagsCopy = [...this.state.tags];
        tagsCopy.forEach((tag, index, self) => {
            if (tag.text === name) {
                self.splice(index, 1);
                this.setState({tags: tagsCopy});
            }
        });
    };

    editTag = (oldText, newText) => {
        let tagsCopy = [...this.state.tags];
        tagsCopy.forEach(tag => {
            if (tag.text === oldText) {
                tag.text = newText;
                this.setState({tags: tagsCopy});
            }
        });
    };

    render() {
        return (
            <div className='app-container'>
                <AddNote pusher={this.newNote}/>
                <AddTag pusher={this.newTag}/>
                <TagList tags={this.state.tags} update={this.editTag} delete={this.deleteTag}/>
                <NoteList notes={this.state.notes} update={this.editNote} delete={this.deleteNote} />
            </div>
        );
    }
}

export default App;