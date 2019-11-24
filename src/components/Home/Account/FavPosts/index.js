/* eslint no-dupe-keys: 0 */
import { ListView, NavBar, Button, Flex, Icon, Toast, ImagePicker } from 'antd-mobile';
import React from 'react'


import * as ROUTES from "../../../../constants/routes";

import add from '../../../icons/add.png'
import ImageContainer from "../../../ImageContainer";
import { get_location } from "../../../utils/getLocation";
import { get_all_liked_posts, get_all_post } from "../../../Firebase/getPosts";
import withAuthentication from "../../../Session/withAuthentication";
const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
        id:1,
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
        id:2,
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
        id:3,
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;
const NUM_ROWS = 20;
const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class FavPosts extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight ,
            currentImg:'',
            isImgClick:false,
        };
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
      this.renderItems();

    }

    renderItems = ()=>{
        this.setState({
            isLoading:true
        })

            const callback = (list)=>{
                    // Read result of the Cloud Function.


                    // this.setState({
                    //         data:list,
                    //         isLoading:false
                    //     }
                    // )
                console.log("123",list)
            }
        get_all_liked_posts(this.props.firebase,this.props.firebase.auth.currentUser.uid,callback);

    }


    onClickComment =(id)=>{

        this.props.history.push(`/home/comments/${id}`)
    }


    render() {
        if(this.state.isLoading){
            Toast.loading('Loading...', 0.5, () => {
                console.log('Load complete !!!');
            });
        }
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );


        return (
            <div >
                <NavBar
                    style={{backgroundColor: '#a6daba', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"70px",position:'fixed',width:"100%", top:0,zIndex:1}}
                    mode="light"

                    rightContent={
                        <div onClick={()=>this.props.history.push(ROUTES.CREATEPOST)} style={{width: '40px',marginTop:"-20px",}}>
                            <img src={add} style={{width:"50px"}} alt="add"/>
                        </div>

                    }
                    leftContent={
                        <div onClick={()=>  this.props.history.goBack()}  style={{width: '40px',marginTop:"-20px", marginLeft:'5px', color:'White', fontSize:'40px',fontWeight: 'bold'}}> &lt;
                        </div>
                    }

                ><h1 style={{color:"white",}}>Favorite</h1>
                </NavBar>
                {this.state.isImgClick&&<ImageContainer currentImg={this.state.currentImg} picClose={this.picClose}/>}
                {/*<div>*/}
                {/*    {*/}
                {/*        this.state.data.map((obj,index)=>{*/}
                {/*            return(*/}
                {/*                <div key={index} style={{ padding: '0 15px', marginBottom:'10px', background:'white' }}>*/}
                {/*                    {index==0?  <div style={{height:'11vh'}}></div>:<div/> /*show the 1st post completely*!/*/}
                {/*                    <div*/}
                {/*                        style={{*/}
                {/*                            lineHeight: '40px',*/}
                {/*                            color: '#888',*/}
                {/*                            fontSize: 15,*/}
                {/*                            borderBottom: '1px solid #F6F6F6',*/}
                {/*                            background:'#ededed',*/}
                
                
                {/*                        }}*/}
                {/*                    >{obj.place?<img style={{width:"5vw"}} src="https://image.flaticon.com/icons/png/128/149/149060.png" alt=""/>:""}{obj.place}</div>*/}
                
                {/*                    <div>*/}
                {/*                        <Flex style={{  padding: '15px 0' }}>*/}
                {/*                            <img style={{ height: '64px', marginRight: '15px' }} src={obj.userAvatar} alt="" />*/}
                {/*                            <div style={{ lineHeight: 1 }}>*/}
                
                {/*                                <div><span style={{  fontSize: '20px',color: '#4e77a1',fontWeight: 'bold' }}>{obj.username}</span></div>*/}
                {/*                                <div style={{ color: '#5396a5',fontSize: '18px',marginBottom: '8px',marginTop: '5px'  }}>{obj.time}</div>*/}
                {/*                            </div>*/}
                {/*                        </Flex>*/}
                {/*                        <Flex>*/}
                {/*                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.content}</div>*/}
                {/*                        </Flex>*/}
                {/*                        <div>*/}
                {/*                            <ImagePicker*/}
                {/*                                files={obj.pictures_url.map((item)=>{*/}
                {/*                                    return {url:item}*/}
                {/*                                })}*/}
                
                {/*                                onChange={this.onChange}*/}
                {/*                                onImageClick={(index, fs) => {*/}
                {/*                                    this.clickImg(fs[index]);*/}
                {/*                                }}*/}
                {/*                                selectable={false}*/}
                {/*                                disableDelete={true}*/}
                {/*                                length={3}*/}
                
                
                {/*                            />*/}
                
                {/*                        </div>*/}
                {/*                    </div>*/}
                
                {/*                    <Flex>*/}
                {/*                        <Flex.Item><Button size='small' activeStyle={{background:'#4e77a1'}}  style={{background:'#5396a5' ,color:"#ecfcee",fontWeight: 'bold'}} onClick={()=> this.onClickComment(obj.postId)}>Comment</Button></Flex.Item>*/}
                {/*                        <Flex.Item><Button size='small' activeStyle={{background:'#4e77a1'}}  style={{background:'#5396a5',color:"#ecfcee",fontWeight: 'bold'}} onClick={this.likes}>Likes {!!!obj.likes?'('+obj.likes.length+')':""}</Button></Flex.Item>*/}
                {/*                    </Flex>*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                
                {/*</div>*/}
            </div>
        );
    }
}

export default withAuthentication(FavPosts);

