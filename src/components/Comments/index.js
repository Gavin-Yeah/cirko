import React, {Component} from 'react';
import Comment from "./Comment";
import Item from '../Item'
class Comments extends Component {

    render() {
        let {comments} = this.props;
        return (
            <div>

            <div >
                <h3 >reply：</h3>
                <h2 style={{display:comments.length>0?'none':'block'}}>no comment</h2>
                <ul >
                    {
                        comments.map((item)=>{
                            return <p>{item}</p>
                        })
                    }

                </ul>
            </div>
                <div><a href="#">write a comment</a></div>
            </div>
        );
    }
}

export default Comments;