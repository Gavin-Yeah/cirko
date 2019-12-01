
import { ListView, NavBar, Button, Flex, Icon, Toast, WingBlank, Carousel, Grid, ImagePicker } from 'antd-mobile';
import React from 'react'


import * as ROUTES from "../../../../constants/routes";

import add from '../../../icons/add.png'
import { get_all_post_by_id } from "../../../Firebase/getPosts";
import withAuthentication from "../../../Session/withAuthentication";
import ImageContainer from "../../../ImageContainer";



class MyPosts extends React.Component {
    constructor(props) {
        super(props);



        this.state = {

            isLoading: true,
            height: document.documentElement.clientHeight ,
            data: [],
            imgHeight: 176,
            currentImg:'',
            isImgClick:false,
        };
    }
    onClickComment =(id)=>{

        this.props.history.push(`/home/comments/${id}`)
    }

    clickImg = (file)=>{

        this.setState({
            isImgClick:true,
            currentImg:file.url
        })
    }
    picClose=()=>{
        console.log("picCLose")
        this.setState({
            isImgClick:false
        })
    }

    componentDidMount() {
        this.setState({
            isLoading:true
        })
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        const promise = get_all_post_by_id(this.props.firebase,this.props.firebase.auth.currentUser.uid)
        promise.then((res)=>{
                this.setState({
                    data:res,
                    isLoading:false
                })

        })


    }




    render() {
        if(this.state.isLoading){
            Toast.loading('Loading...', 0.5, () => {
                console.log('Load complete !!!');
            });
        }


        return (
            <div >
                <NavBar

                    style={{backgroundColor: '#a6daba', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"7vh",position:'fixed',width:"100%", top:0,zIndex:1}}
                    mode="light"

                    rightContent={
                        <div onClick={()=>this.props.history.push(ROUTES.CREATEPOST)} style={{width: '40px',marginTop:"-10px",}}>
                            <img src={add} style={{width:"40px"}} alt="add"/>
                        </div>

                    }
                    leftContent={
                        <div onClick={()=>  this.props.history.goBack()}  style={{width: '40px',marginTop:"-20px", marginLeft:'5px', color:'White', fontSize:'40px',fontWeight: 'bold'}}> &lt;
                        </div>
                    }

                ><h1 style={{color:"white",}}>My Posts</h1>
                </NavBar>

                {this.state.isImgClick&&<ImageContainer currentImg={this.state.currentImg} picClose={this.picClose}/>}

                <div >
                    {
                        this.state.data.map((obj,index)=>{
                            return(
                                <div key={index} style={{ padding: '0 15px', marginBottom:'10px', background:'white' }}>
                                    {index==0?  <div style={{height:'11vh'}}></div>:<div/> /*show the 1st post completely*/}
                                    <div
                                        style={{
                                            lineHeight: '40px',
                                            color: '#888',
                                            fontSize: 15,
                                            borderBottom: '1px solid #F6F6F6',
                                            background:'#ededed',


                                        }}
                                    >{obj.place?<img style={{width:"5vw"}} src="https://image.flaticon.com/icons/png/128/149/149060.png" alt=""/>:""}{obj.place}</div>

                                    <div>
                                        <Flex style={{  padding: '15px 0' }}>
                                            <img style={{ height: '64px', marginRight: '15px' }} src={obj.userAvatar} alt="" />
                                            <div style={{ lineHeight: 1 }}>

                                                <div><span style={{  fontSize: '20px',color: '#4e77a1',fontWeight: 'bold' }}>{obj.username}</span></div>
                                                <div style={{ color: '#5396a5',fontSize: '18px',marginBottom: '8px',marginTop: '5px'  }}>{(new Date(obj.time)).toLocaleString()}</div>
                                            </div>
                                        </Flex>
                                        <Flex>
                                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.content}</div>
                                        </Flex>
                                        <div>
                                            <ImagePicker
                                                files={obj.pictures_url.map((item)=>{
                                                    return {url:item}
                                                })}

                                                onChange={this.onChange}
                                                onImageClick={(index, fs) => {
                                                    this.clickImg(fs[index]);
                                                }}
                                                selectable={false}
                                                disableDelete={true}
                                                length={3}


                                            />

                                        </div>
                                    </div>

                                    <Flex>
                                        <Flex.Item><Button size='small' activeStyle={{background:'#7fc4a7'}} style={{background:'#a6daba' ,color:"#ecfcee",fontWeight: 'bold'}} onClick={()=> this.onClickComment(obj.postId)}>Comment({obj.comments.length})</Button></Flex.Item>
                                    </Flex>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default withAuthentication(MyPosts);

