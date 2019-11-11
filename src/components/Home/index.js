import React from 'react';
import {withAuthorization} from '../Session';
import Item from "../Item";
import * as ROUTES from "../../constants/routes";
import CreatePost from '../CreatePost'
import Navigation from "../Navigation";
import PostPage from '../PostPage'
import {TabBar, ListView, NavBar,Icon} from 'antd-mobile';
import './index.css'
import AccountPage from "../Account";
import {Route, Link} from 'react-router-dom'
import icon from '../icons/cirko-trans.png'
import EditAvatar from "../EditAvatar";
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
    //             <button onClick={this.onAddClickHandler}>add</button>
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
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
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
    onClickAdd=()=>{
        this.props.history.push(ROUTES.CREATEPOST);
    }
    render() {
        return (

            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
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
                        badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                            this.props.history.push('/home/postpage')
                        }}
                        data-seed="logId"
                    >
                        <NavBar
                            style={{position:'fixed',width:"100%", top:0,zIndex:1}}
                            mode="light"

                            rightContent={
                               <div onClick={this.onClickAdd}> <img style={{width: '30px'}}
                                     src="https://image.flaticon.com/icons/png/128/148/148781.png" alt=""/>
                               </div>

                            }
                                ><h1>CIRKO</h1></NavBar>
                      <PostPage/>
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
                        title="Friend"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        {this.renderContent('Friend')}
                    </TabBar.Item>
                     <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                            this.props.history.push("/home/account")

                        }}
                    >
                       <Route path={"/home/account"} component={AccountPage}/>
                         <Route path={ROUTES.EDITAVATAR} component={EditAvatar}/>
                     </TabBar.Item>

                </TabBar>
            </div>
        );
    }

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);