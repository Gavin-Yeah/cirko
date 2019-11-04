import React, {Component} from 'react';

class Comment extends Component {
    render() {
       const {userName,time,content,likes}=this.props;
        return (
            <div>
                <p>{userName}</p>
                <p>{time}</p>
                <p>{content}</p>
                <p>{likes}</p>
            </div>
        );
    }
}

export default Comment;