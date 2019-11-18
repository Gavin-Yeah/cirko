
import PasswordChangeForm from './PasswordChange';
import { AuthUserContext, withAuthorization } from '../../Session';//import authorization
import {Flex, List, WhiteSpace, NavBar, Icon, Button} from 'antd-mobile'
import {NavLink} from "react-router-dom";
import React, {Component} from 'react';
import './index.css'
import SignOutButton from "./SignOut";
import * as ROUTES from "../../../constants/routes";
import EditAvatar from "./EditAvatar";
import add from "../../icons/add.png";
class AccountPage extends Component {
    state = {
        avatarUrl:"https://image.flaticon.com/icons/png/128/149/149071.png",
        userName:"",

    }
    onClickAvatar=()=>{
        this.props.history.push(ROUTES.EDITAVATAR);
    }
    onClickAdd=()=>{
    this.props.history.push(ROUTES.CREATEPOST);
}

    initPage = ()=>{
        const avatarUrl = this.props.firebase.auth.currentUser.photoURL;
        const userName = this.props.firebase.auth.currentUser.displayName;
        console.log(userName)
        this.setState({
            avatarUrl,
            userName


        })
    }
    componentDidMount() {
        this.initPage();
    }


    render() {

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div >


                        <NavBar
                            style={{backgroundColor: '#5396a5', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"70px",position:'fixed',width:"100%", top:0,zIndex:1}}
                            mode="light"

                            rightContent={
                                <div onClick={()=>this.props.history.push(ROUTES.CREATEPOST)} style={{width: '40px',marginTop:"-20px",}}>
                                    <img src={add} style={{width:"50px"}} alt="add"/>
                                </div>

                            }
                        ><h1 style={{color:"white",}}>CIRKO</h1>
                        </NavBar>
                        <div style={{height:'70px'}}></div>
                        <Flex className={"userInfoContainer"}>
                            <Flex.Item onClick={this.onClickAvatar}><img className='avatar' src={this.state.avatarUrl} alt="avatar"/></Flex.Item>
                            <Flex.Item onClick={()=>{return  this.props.history.push(ROUTES.EDITNAME)}} style={{flex:3, paddingLeft:"10px"}}><h1>{this.state.userName}</h1></Flex.Item>

                        </Flex>
                        <List >
                            <List.Item
                                thumb='https://image.flaticon.com/icons/png/128/148/148836.png'
                                arrow="horizontal"
                                onClick={() => {return this.props.history.push(ROUTES.FAVPOSTS)}}
                            >Favorites</List.Item>
                            <List.Item
                                thumb="https://image.flaticon.com/icons/png/128/148/148998.png"
                                onClick={() => {return this.props.history.push(ROUTES.MYPOSTS)}}
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