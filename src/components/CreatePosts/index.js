import React, {Component} from 'react';
import {withAuthorization} from "../Session";

class Index extends Component {
    state = {
        content:'',
        pics:[]

    }
    contentRef =  React.createRef();
    add = ()=>{
        let {addPost} = this.props
        let content = this.contentRef.current.value;
        const postObj = {id:4,userName:'Jack',time:'10:31 10/10/2019',content: content, pics:[], likes:0}
        addPost(postObj)
        this.setState({
            content:'',
            pics:[]
        })

    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {

        const {onAddCanceledHandler} = this.props
        let {content,pics} = this.state
        return (
            <div>
                <div>header
                    <button onClick={onAddCanceledHandler}>cancel</button>
                    <button onClick={this.add}>submit</button></div>
                <div><textarea name="content" value={content} onChange={this.onChange} cols="30" rows="10" ref={this.contentRef} placeholder="What's happening?"></textarea>
                <div>pictures</div>
                    <div>
                        <button>add pics</button>
                        <button>show location?</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Index;