import React, { Component } from 'react';
import { Icon, List, NavBar, WingBlank } from "antd-mobile";
import * as ROUTES from "../../../../constants/routes";
import add from "../../../icons/add.png";
import icon from '../../../icons/cirko2.png'
import "./index.css"
class About extends Component {
    render() {
        return (
            <div>
                <NavBar
                    style={{backgroundColor: '#5396a5', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"7vh",position:'fixed',width:"100%", top:0,zIndex:1}}
                    mode="light"


                    leftContent={
                        <div onClick={()=>  this.props.history.goBack()}  style={{width: '40px',marginTop:"-20px", marginLeft:'5px', color:'White', fontSize:'40px',fontWeight: 'bold'}}> &lt;
                        </div>
                    }

                ><h1 style={{color:"white",}}>About</h1></NavBar>


                <div className={"iconContainer"}>
                <div className={"icon1"}>
                    <img className={"image"} src={icon} alt=""/>
                </div>
                <div className={"icon2"}>
                    <h2 className={"appName"}>CIRKO</h2>
                </div>
                </div>
                <WingBlank size={"lg"} style={{background:'white'}}>
                    <div style={{padding:'10px',color:'5396a5', fontSize:'20px'}}>
                        CIRKO is a location-based SNS web app
                    </div>
                </WingBlank>

            </div>
        );
    }
}

export default About;