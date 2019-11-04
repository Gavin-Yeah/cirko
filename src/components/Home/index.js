import React from 'react';
import {withAuthorization} from '../Session';
import Item from "../Item";
import * as ROUTES from "../../constants/routes";
import CreatePost from '../CreatePosts'

class HomePage extends React.Component {

    state = {
        posts: [{
            id: '1',
            userName: 'Nick',
            time: '10/01/2019',
            comments: ['i like it', "i hate it"],
            content: "null",
            likes: 5,
            location: 'Irvine, CA',
            pics: [{
                imgId: 1,
                imgUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1658603858,686533857&fm=26&gp=0.jpg"
            }]
        },
            {
                id: '2',
                userName: 'Tony',
                time: '10/01/2019',
                comments: ['i like it', "i hate it"],
                content: "null",
                likes: 5,
                location: 'Irvine, CA',
                pics: [{
                    imgId: 1,
                    imgUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1658603858,686533857&fm=26&gp=0.jpg"
                }]
            }],
        isAddClicked: false
    }
    toCommentPage = () => {
        this.props.history.push(ROUTES.COMMENTS);
    }
    onAddClickHandler = () => {
        this.setState({isAddClicked: true})
    }
    onAddCanceledHandler = () => {
        this.setState({isAddClicked: false})
    }
    addPost = (postObj) => {
        let posts = [...this.state.posts]
        posts.unshift(postObj);
        this.setState({posts});
    }

    render() {
        const {isAddClick, posts} = this.state;
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={this.onAddClickHandler}>add</button>
                <p>The Home Page is accessible by every signed in user.</p>
                <div>
                    {posts.map((item) => {
                        return (<Item toCommentPage={this.toCommentPage} key={item.id} {...item}/>)
                    })
                    }
                </div>
                <div style={{display: isAddClick ? 'block' : 'none'}}>
                    <CreatePost addPost={this.addPost} onAddCandeledHandler={this.onAddCanceledHandler}/>
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);