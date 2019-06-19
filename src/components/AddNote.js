import React from 'react';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    addNote(e) {
        e.preventDefault();
        this.props.pusher(this.state.text);
        this.setState({text: ''});
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addNote}>
                    <input type="text" onChange={this.handleChange} value={this.state.text}/>
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default AddNote;