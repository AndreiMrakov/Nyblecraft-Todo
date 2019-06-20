import React from 'react';

class SingleTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='tag-name'>
                {this.props.tag.text}
            </div>
        );
    }
}

export default SingleTag;