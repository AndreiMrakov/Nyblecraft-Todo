import React from 'react';
import axios from "axios";
import AddNote from "./AddNote";
import TagList from "./TagList";
import NoteList from "./NoteList";
import AddTag from "./AddTag";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filter: [],
            filterNotes: [],
            tags: [],
            id: 0,
            server: 'http://localhost:8080/database',
            token: '123',
        };
    }

    componentDidMount() {
        axios.get(this.state.server)
            .then(res => this.setState({
                    notes: res.data.notes,
                    filterNotes: res.data.notes,
                    tags: res.data.tags,
                    id: res.data.id
                })
            );
    }

    updateServer = () => {
        axios.post(this.state.server, {
            notes: this.state.notes,
            tags: this.state.tags,
            id: this.state.id
        }, {headers: {"token": this.state.token}});
    };

    newNote = (note) => {
        let noteTags = note.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) !== null ? note.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) : [];
        let notesCopy = [...this.state.notes];
        let newNote = {
            id: this.state.id + 1,
            text: note,
            tags: noteTags,
        };
        notesCopy.push(newNote);

        if (noteTags.length) {
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
        this.setState({notes: notesCopy, filterNotes: notesCopy, id: this.state.id + 1}, () => this.updateServer());
    };

    deleteNote = (id) => {
        let notesCopy = [...this.state.notes];
        let tagsCopy = [...this.state.tags];
        notesCopy.forEach((note, index) => {
            if (note.id === id) {
                notesCopy.splice(index, 1);
            }
        });
        tagsCopy.forEach(tag => {
            if (tag.owners.includes(id)) {
                tag.owners.splice(tag.owners.indexOf(id), 1);
            }
        });
        this.setState({notes: notesCopy, filterNotes: notesCopy, tags: tagsCopy}, () => this.updateServer());
    };

    editNote = (id, text) => {
        let notesCopy = [...this.state.notes];
        let tagsCopy = [...this.state.tags];
        let newNoteTags = text.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) !== null ? text.match(/(#[a-z0-9][a-z0-9\\-_]*)/ig) : [];
        if (newNoteTags.length) {
            this.newTag(newNoteTags, id);
        } else {
            tagsCopy.forEach(tag => {
                if (tag.owners.includes(id)) {
                    tag.owners.splice(tag.owners.indexOf(id), 1);
                }
            });
        }
        notesCopy.forEach(note => {
            if (note.id === id) {
                note.text = text;
                note.tags = newNoteTags;
                // new filtered array if filter uses the same time as editing
                let newFilteredNotes = [...notesCopy].filter(note => [...this.state.filter].every(tag => note.tags.includes(tag)));
                this.setState({notes: notesCopy, filterNotes: newFilteredNotes}, () => this.updateServer());
            }
        });

    };

    newTag = (tags, owner) => {
        let tagsCopy = [...this.state.tags];
        tags.forEach(tag => {
            let tagsTextCopy = [...this.state.tags].map(t => t.text);
            if (!tagsTextCopy.includes(tag)) {
                let newTag = {
                    text: tag,
                    owners: owner !== undefined ? [owner] : [],
                };
                tagsCopy.push(newTag);
                this.setState({tags: tagsCopy}, () => this.updateServer());
            } else if (tagsTextCopy.includes(tag) && owner) {
                tagsCopy.forEach(t => {
                    if (t.text === tag && !t.owners.includes(owner)) {
                        t.owners.push(owner);
                        t.owners.sort();
                        this.setState({tags: tagsCopy}, () => this.updateServer());
                    }
                });
            }
        });
    };

    deleteTag = (name) => {
        let tagsCopy = [...this.state.tags];
        tagsCopy.forEach((tag, index, self) => {
            if (tag.text === name) {
                self.splice(index, 1);
                this.setState({tags: tagsCopy}, () => this.updateServer());
            }
        });
    };

    editTag = (oldText, newText) => {
        let tagsCopy = [...this.state.tags];
        tagsCopy.forEach(tag => {
            if (newText === '') {
                this.deleteTag(oldText);
            } else if (tag.text === oldText) {
                tag.text = newText.charAt(0) !== '#' ? `#${newText}` : newText;
                this.setState({tags: tagsCopy}, () => this.updateServer());
            }
        });

    };

    syncTags = () => {
        let tagsCopy = [...this.state.tags];
        [...this.state.notes].forEach(note => {
            note.tags.forEach(tag => {
                let tagsTextCopy = tagsCopy.map(t => t.text);

                if (!tagsTextCopy.includes(tag)) {
                    let newTag = {
                        text: tag,
                        owners: [note.id],
                    };
                    tagsCopy.push(newTag);
                    this.setState({tags: tagsCopy.sort()}, () => this.updateServer());
                } else {
                    tagsCopy.forEach(t => {
                        if (t.text === tag && !t.owners.includes(note.id)) {
                            t.owners.push(note.id);
                            t.owners.sort();
                            this.setState({tags: tagsCopy.sort()}, () => this.updateServer());
                        }
                    });
                }
            });
        });
    };

    filterNotes = (tag) => {
        let filterCopy = [...this.state.filter];
        filterCopy.includes(tag.text) ? filterCopy.splice(filterCopy.indexOf(tag.text), 1) : filterCopy.push(tag.text);
        let newFilteredNotes = [...this.state.notes].filter(note => filterCopy.every(t => note.tags.includes(t)));
        this.setState({filter: filterCopy, filterNotes: newFilteredNotes});
    };


    render() {
        return (
            <div className='app-container'>
                <AddNote pusher={this.newNote}/>
                <AddTag pusher={this.newTag}/>
                <TagList tags={this.state.tags}
                         update={this.editTag}
                         delete={this.deleteTag}
                         filter={this.filterNotes}
                />
                <NoteList notes={this.state.filterNotes}
                          update={this.editNote}
                          delete={this.deleteNote}
                          sync={this.syncTags}
                />
            </div>
        );
    }
}

export default App;