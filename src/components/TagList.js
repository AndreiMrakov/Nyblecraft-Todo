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
                {this.props.tags.map(tag => tag.text && <SingleTag key={tag.text} tag={tag}/>)}
            </div>
        );
    }
}

export default TagList;