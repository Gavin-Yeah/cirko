
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';//import authorization
import {Flex, List, WhiteSpace, NavBar, Icon, Button} from 'antd-mobile'
import {NavLink} from "react-router-dom";
import React, {Component} from 'react';
import './index.css'
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import EditAvatar from "../EditAvatar";
class AccountPage extends Component {
    state = {
        avatarUrl:"https://image.flaticon.com/icons/png/128/149/149071.png",
        userName:"Jack",

    }
    onClickAvatar=()=>{
        this.props.history.push(ROUTES.EDITAVATAR);
    }
    onClickAdd=()=>{
    this.props.history.push(ROUTES.CREATEPOST);
}

    render() {
        const {userName, avatarUrl} = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div >


                        <NavBar
                            mode="light"


                            rightContent={
                              <div onClick={this.onClickAdd}> <img style={{width:'30px'}} src="https://image.flaticon.com/icons/png/128/148/148781.png" alt=""/>
                              </div>

                            }
                        />
                        <Flex className={"userInfoContainer"}>
                            <Flex.Item onClick={this.onClickAvatar}><img src={avatarUrl} alt="avatar"/></Flex.Item>
                            <Flex.Item style={{flex:3, paddingLeft:"10px"}}><h1>{userName}</h1></Flex.Item>
                            <Icon type="ellipsis" />
                        </Flex>
                        <List >
                            <List.Item
                                thumb='https://image.flaticon.com/icons/png/128/148/148836.png'
                                arrow="horizontal"
                                onClick={() => {}}
                            >Favorites</List.Item>
                            <List.Item
                                thumb="https://image.flaticon.com/icons/png/128/148/148998.png"
                                onClick={() => {}}
                                arrow="horizontal"
                            >
                                My Posts
                            </List.Item>
                        </List>
                        <WhiteSpace/>
                        <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/>



                        <PasswordChangeForm />
                        <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/> <WhiteSpace/>

                       <SignOutButton/>
                    </div>
                )}
            </AuthUserContext.Consumer>


        );
    }
}


const condition = authUser => !!authUser;  //set condition
export default withAuthorization(condition)(AccountPage);