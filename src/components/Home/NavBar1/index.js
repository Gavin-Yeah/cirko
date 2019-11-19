import React, { Component } from 'react';
import NavBar from "antd-mobile/lib/nav-bar";
import * as ROUTES from "../../../constants/routes";
import add from '../../icons/add.png'
class NavBar1 extends Component {
    render() {
        return (
            <NavBar
                style={{backgroundColor: '#5396a5', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"7vh",position:'fixed',width:"100%", top:0,zIndex:2}}
                mode="light"

                rightContent={
                    <div onClick={()=>this.props.history.push(ROUTES.CREATEPOST)} style={{width: '40px',marginTop:"-10px",}}>
                        <img src={add} style={{width:"40px"}} alt="add"/>
                    </div>

                }
            ><h1 style={{color:"white",}}>CIRKO</h1>
            </NavBar>
        );
    }
}

export default NavBar1;