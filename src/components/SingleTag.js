import React from 'react';

class SingleTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: null,
            newText: '',
            editMode: false,
        };
    }

    componentWillMount = () => this.setState({tag: this.props.tag, newText: this.props.tag.text});

    deleteTag = () => this.props.delete(this.props.tag.text);

    editModeChanger = () => this.setState({editMode: !this.state.editMode});

    updateTag = () => {
        this.props.update(this.state.tag.text, this.state.newText);
        this.editModeChanger();
    };

    handleChange = (e) => this.setState({newText: e.target.value});


    render() {
        return (
            <div className='tag-name'>
                {!this.state.editMode && <span>{this.props.tag.text}</span>}
                {!this.state.editMode && <span className='edit-tag' onClick={this.editModeChanger}/>}
                {this.state.editMode && <textarea onChange={this.handleChange} value={this.state.newText}/>}
                {this.state.editMode && <span className='save-tag' onClick={this.updateTag}/>}
                <span className='delete-note' onClick={this.deleteNote}/>
            </div>
        );
    }
}

export default SingleTag;