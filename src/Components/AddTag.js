import React from 'react';

class AddTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    addTag = (e) => {
        e.preventDefault();
        let newTags = this.state.text.replace(/\s+/g,' ').trim().split(' ').map(tag => tag.charAt(0) === '#' ? tag : `#${tag}`);
        newTags = newTags.filter((tag, index, self) => index === self.indexOf(tag) && tag.split('').filter(char => char !== '#').join())
            .map(tag => `#${tag.split('').filter(char => char !== '#').join('')}`);
        this.props.pusher(newTags);
        this.setState({text: ''});
    };

    handleChange = (e) => this.setState({text: e.target.value});

    render() {
        return (
            <div>
                <form onSubmit={this.addTag}>
                    <input type="text" onChange={this.handleChange} value={this.state.text} required/>
                    <button>Add Tag</button>
                </form>
            </div>
        );
    }
}

export default AddTag;