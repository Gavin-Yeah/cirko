import React, { Component } from 'react';
import Comment from "./Comment";
import { withAuthorization } from "../Session";

class Comments extends Component {
    state={
        comments:[{id:1,userName:'Nick',time:'10:30 10/10/2019',content:"abc", likes:5}],
        isWriteCommentClicked:false,
        comment:""
    }
    commentRef = React.createRef();
onCLickWriteCommentHandler = ()=>{
        this.setState({isWriteCommentClicked:true})
}
onClickSubmitHandler = ()=>{
    const {comment} = this.state;
    const commentObj = {userName:'Jack',time:'10:31 10/10/2019',content: comment, likes:0}
    let comments = [...this.state.comments]
    comments.unshift(commentObj);
    this.setState({comments, comment: ""})

}
    onClickCancelHandler = ()=>{
    this.setState({ isWriteCommentClicked:false})
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        let {comments, isWriteCommentClicked,comment} = this.state;
        return (
            <div>

            <div>
                <h3 >reply：</h3>
                <h2 style={{display:comments.length>0?'none':'block'}}>no comment</h2>
                <div >
                    {
                        comments.map((item)=>{
                            return (
                                <Comment key={item.id} {...item}/>
                            )})
                    }

                </div>
            </div>
                <div style={{display:isWriteCommentClicked?'block':'none'}}>
                    <div>
                        <button onClick={this.onClickCancelHandler}>back</button></div>
                    <textarea name="comment" value={comment}id="comment" cols="30" rows="10" ref={this.commentRef} onChange={this.onChange}></textarea>
                    <button onClick={this.onClickSubmitHandler}>submit</button></div>
                <div><a href="#" onClick={this.onCLickWriteCommentHandler}>write a comment</a></div>
            </div>
        );
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Comments);