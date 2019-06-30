import React from 'react';
import SingleTag from "./SingleTag";

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='tags-container'>
                {this.props.tags[0] && <span>Tags: </span>}
                {this.props.tags.map(tag => tag.text &&
                    <SingleTag key={tag.text}
                               tag={tag}
                               update={this.props.update}
                               delete={this.props.delete}
                               filter={this.props.filter}
                    />)}
            </div>
        );
    }
}

export default TagList;