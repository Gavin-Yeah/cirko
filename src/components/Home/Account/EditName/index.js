import React, {Component} from 'react';
import {NavBar, Icon, List,InputItem,Button} from "antd-mobile";
import {updateUserName}from '../../../Firebase/upload';
import withAuthentication from '../../../Session/withAuthentication'
import * as ROUTES from "../../../../constants/routes";

class EditName extends Component {

    onClick = ()=>{
        updateUserName(this.props.firebase,this.props.firebase.auth.currentUser.uid,this.nameRef.current.state.value,()=>{
            this.props.history.replace(ROUTES.ACCOUNT);
        });

    }
    nameRef = React.createRef();
    render() {
        return (
            <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}



            >Update Name</NavBar>
                <List style={{margin:'20px 0'}}>
                    <InputItem
                        ref={this.nameRef}

                    >Name</InputItem>

                </List>
                <Button type={"primary"} style={{marginTop:'20px'}} onClick={this.onClick}>Done</Button>
            </div>
        );
    }
}

export default withAuthentication(EditName);