import React from 'react';
import { withAuthorization } from '../Session';
import * as ROUTES from "../../constants/routes";
import CreatePost from '../CreatePost'
import PostPage from './PostPage'
import { TabBar } from 'antd-mobile';
import './index.css'
import AccountPage from "./Account";
import { Route } from 'react-router-dom'
import EditAvatar from "./Account/EditAvatar";
import About from './Account/About'
import MyPosts from './Account/MyPosts';
import FavPosts from "./Account/FavPosts";
import EditName from "./Account/EditName";
import { compose } from "recompose";
import Comments from "../Comments";
import AddComment from "../Comments/AddComment";

class HomePage extends React.Component {

    state = {
        posts: [],
        isAddClicked: false
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
                        selected={this.state.selectedTab === 'postpage'}

                        onPress={() => {
                            this.setState({
                                selectedTab: 'postpage',
                            });
                            this.props.history.push(ROUTES.POSTPAGE)
                        }}
                        data-seed="logId"
                    >

                      <Route path={ROUTES.POSTPAGE} component={PostPage}/>
                    </TabBar.Item>

                    {/*<TabBar.Item*/}
                    {/*    icon={*/}
                    {/*        <div style={{*/}
                    {/*            width: '22px',*/}
                    {/*            height: '22px',*/}
                    {/*            background: 'url(https://image.flaticon.com/icons/png/128/148/148800.png) center center /  21px 21px no-repeat' }}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*    selectedIcon={*/}
                    {/*        <div style={{*/}
                    {/*            width: '22px',*/}
                    {/*            height: '22px',*/}
                    {/*            background: 'url(https://image.flaticon.com/icons/png/128/148/148800.png) center center /  21px 21px no-repeat' }}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*    title="Following"*/}
                    {/*    key="Following"*/}
                    {/*    selected={this.state.selectedTab === 'following'}*/}
                    {/*    onPress={() => {*/}
                    {/*        this.setState({*/}
                    {/*            selectedTab: 'following',*/}
                    {/*        });*/}
                    {/*        this.props.history.push(ROUTES.FOLLOWING)*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Route path={ROUTES.FOLLOWING} component={Following}/>*/}
                    {/*</TabBar.Item>*/}
                     <TabBar.Item
                        icon={{ uri: 'https://image.flaticon.com/icons/png/128/124/124576.png' }}
                        selectedIcon={{ uri: 'https://image.flaticon.com/icons/png/128/124/124576.png' }}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'my'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'my',
                            });
                            this.props.history.push(ROUTES.ACCOUNT)

                        }}
                    >
                       <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                         <Route path={ROUTES.EDITAVATAR} component={EditAvatar}/>
                         <Route path={ROUTES.EDITNAME} component={EditName}/>
                         <Route path={ROUTES.MYPOSTS} component={MyPosts}/>
                         <Route path={ROUTES.FAVPOSTS} component={FavPosts}/>
                         <Route path={ROUTES.ABOUT} component={About}/>
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