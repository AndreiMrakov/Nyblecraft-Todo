import React from 'react';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    addNote = (e) => {
        e.preventDefault();
        this.props.pusher(this.state.text);
        this.setState({text: ''});
    };

    handleChange = (e) =>  {
        this.setState({text: e.target.value});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.addNote}>
                    <input type="text" onChange={this.handleChange} value={this.state.text} required/>
                    <button>Add Note</button>
                </form>
            </div>
        );
    }
}

export default AddNote;