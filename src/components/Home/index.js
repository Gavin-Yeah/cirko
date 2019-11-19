import React from 'react';
import {withAuthorization} from '../Session';
import Item from "../Item";
import * as ROUTES from "../../constants/routes";
import CreatePost from '../CreatePost'
import Navigation from "../Navigation";
import PostPage from './PostPage'
import {TabBar, ListView, NavBar,Icon} from 'antd-mobile';
import './index.css'
import AccountPage from "./Account";
import {Route, Link} from 'react-router-dom'
import icon from '../icons/cirko-trans.png'
import add from '../icons/add.png'
import EditAvatar from "./Account/EditAvatar";
import {MYPOSTS} from "../../constants/routes";
import MyPosts from './Account/MyPosts';
import FavPosts from "./Account/FavPosts";
import EditName from "./Account/EditName";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import withAuthentication from "../Session/withAuthentication";
import Following from "./Following";
import Comments from "../Comments";
import AddComment from "../Comments/AddComment";
class HomePage extends React.Component {

    state = {
        posts: [{
            id: '1',
            userName: 'Nick',
            time: '10/01/2019',
            comments: [{id:1,userName:'Nick',time:'10:30 10/10/2019',content:"abc", likes:5}],
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

    // render() {
    //     const {isAddClick, posts} = this.state;
    //     return (
    //         <div>
    //             <h1>Home Page</h1>
    //             <button onClick={this.onAddClickHandler}>add.png</button>
    //             <p>The Home Page is accessible by every signed in user.</p>
    //             <div>
    //                 {posts.map((item) => {
    //                     return (<Item toCommentPage={this.toCommentPage} key={item.id} {...item}/>)
    //                 })
    //                 }
    //             </div>
    //             <div style={{display: isAddClick ? 'block' : 'none'}}>
    //                 <CreatePost addPost={this.addPost} onAddCandeledHandler={this.onAddCanceledHandler}/>
    //             </div>
    //             <Navigation />
    //         </div>
    //     )
    // }


    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: '#ecfcee', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
            </div>
        );
    }

    render() {

        return (

            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <Route path={ROUTES.CREATEPOST} component={CreatePost} />
                <Route path={ROUTES.COMMENTS} component={Comments} />
                <Route path={ROUTES.ADDCOMMENT} component={AddComment} />


                <TabBar
                    unselectedTintColor="#a6daba"
                    tintColor="#5396a5"
                    barTintColor="#white"
                    tabBarPosition="bottom"
                    hidden={this.state.hidden}
                    prerenderingSiblingsNumber={0}
                >
                    <TabBar.Item
                        title="Post"
                        key="Post"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(https://image.flaticon.com/icons/png/128/148/148845.png) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://image.flaticon.com/icons/png/128/148/148845.png) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}

                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                            this.props.history.push(ROUTES.POSTPAGE)
                        }}
                        data-seed="logId"
                    >

                      <Route path={ROUTES.POSTPAGE} component={PostPage}/>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://image.flaticon.com/icons/png/128/148/148800.png) center center /  21px 21px no-repeat' }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://image.flaticon.com/icons/png/128/148/148800.png) center center /  21px 21px no-repeat' }}
                            />
                        }
                        title="Following"
                        key="Following"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                            this.props.history.push(ROUTES.FOLLOWING)
                        }}
                    >
                        <Route path={ROUTES.FOLLOWING} component={Following}/>
                    </TabBar.Item>
                     <TabBar.Item
                        icon={{ uri: 'https://image.flaticon.com/icons/png/128/124/124576.png' }}
                        selectedIcon={{ uri: 'https://image.flaticon.com/icons/png/128/124/124576.png' }}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                            this.props.history.push(ROUTES.ACCOUNT)

                        }}
                    >
                       <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                         <Route path={ROUTES.EDITAVATAR} component={EditAvatar}/>
                         <Route path={ROUTES.EDITNAME} component={EditName}/>
                         <Route path={ROUTES.MYPOSTS} component={MyPosts}/>
                         <Route path={ROUTES.FAVPOSTS} component={FavPosts}/>
                     </TabBar.Item>

                </TabBar>
            </div>
        );
    }

}

const condition = authUser => !!authUser;
HomePage = compose(

    withAuthorization(condition),

)(HomePage);
export default HomePage;