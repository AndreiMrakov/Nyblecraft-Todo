import React from 'react';

class SingleNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: null,
            newText: '',
            editMode: false,
        };
    }

    componentWillMount = () => this.setState({note: this.props.note, newText: this.props.note.text});
    deleteNote = () => this.props.delete(this.props.note.id);
    editModeChanger = () => this.setState({editMode: !this.state.editMode});
    updateNote = () => {
        this.props.update(this.state.note.id, this.state.newText);
        this.editModeChanger();
    };
    handleChange = (e) => this.setState({newText: e.target.value});


    render() {
        return (
            <div className='note-container'>
                {!this.state.editMode && <span className='note-text'>{this.props.note.text}</span>}
                {!this.state.editMode && <span className='edit-note' onClick={this.editModeChanger}/>}
                {this.state.editMode && <textarea onChange={this.handleChange} value={this.state.newText} />}
                {this.state.editMode && <span className='save-note' onClick={this.updateNote}/>}
                <span className='delete-note' onClick={this.deleteNote}/>
            </div>
        );
    }
}

export default SingleNote;