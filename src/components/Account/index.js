
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';//import authorization
import {Flex, List, WhiteSpace, NavBar, Icon, Button} from 'antd-mobile'

import React, {Component} from 'react';
import './index.css'
import SignOutButton from "../SignOut";
class AccountPage extends Component {
    state = {
        avatarUrl:"https://image.flaticon.com/icons/png/128/149/149071.png",
        userName:"Jack",

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
                                <img style={{width:'30px'}} src="https://image.flaticon.com/icons/png/128/148/148781.png" alt=""/>


                            }
                        />
                        <Flex className={"userInfoContainer"}>
                            <Flex.Item><img src={avatarUrl} alt="avatar"/></Flex.Item>
                            <Flex.Item style={{flex:3}}><h1>{userName}</h1></Flex.Item>
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