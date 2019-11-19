/* eslint no-dupe-keys: 0 */
import { ListView, NavBar, Button, Flex, Icon, Toast, WingBlank, Carousel, Grid, ImagePicker } from 'antd-mobile';
import React from 'react'


import * as ROUTES from "../../../../constants/routes";

import add from '../../../icons/add.png'
import { get_all_post_by_id } from "../../../Firebase/getPosts";
import withAuthentication from "../../../Session/withAuthentication";
import ImageContainer from "../../../ImageContainer";
let data = [
    {
        img: [{
            url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
            id: 11,
        }, {
            url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
            id: 12
        },
            {
                url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                id: 15
            }
        ],
            title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
        id:1,
    },
    {
        img: [{
            url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
            id: 11,
        }, {
            url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
            id: 12
        },
            {
                url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                id: 15
            }
        ],
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
        id:2,
    },
    {
        img: [{
            url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
            id: 11,
        }, {
            url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
            id: 12
        },
            {
                url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                id: 15
            }
        ],
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

class MyPosts extends React.Component {
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
            data: ['1', '2', '3'],
            imgHeight: 176,
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
        data=[];
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        get_all_post_by_id(this.props.firebase,this.props.firebase.auth.currentUser.uid,(i)=>{
            data.push(i);
            console.log(i);
        })
        //console.log(this.props.firebase.db.collection("users").doc(this.props.firebase.auth.currentUser.uid))

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this. rData),
                isLoading: false,
            });
        }, 600);
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
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
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{padding: '0 15px'}} >

                    {rowID==0?  <div style={{height:'70px' ,background:'white'}}></div>:<div/> /*show the 1st post completely*/}
                    <div
                        style={{
                            lineHeight: '40px',
                            color: '#888',
                            fontSize: 15,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.location}</div>
                    <div>
                        <Flex style={{  padding: '15px 0' }}>
                            <img style={{ height: '64px', marginRight: '15px' }} src={"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"} alt="" />
                            <div style={{ lineHeight: 1 }}>

                                <div><span style={{  fontSize: '20px',color: '#4e77a1',fontWeight: 'bold' }}>{obj.username}</span></div>
                                <div style={{ color: '#5396a5',fontSize: '18px',marginBottom: '8px',marginTop: '5px'  }}>{obj.time}</div>
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
                        <Flex.Item><Button size='small' style={{background:'#a6daba' ,color:"white",fontWeight: 'bold'}} onClick={()=> this.onClickComment(obj.id)}>Comment</Button></Flex.Item>
                        <Flex.Item><Button size='small' style={{background:'#a6daba',color:"white",fontWeight: 'bold'}}>Like</Button></Flex.Item>
                    </Flex>
                </div>

            );
        };
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

                ><h1 style={{color:"white",}}>Favorite</h1>
                </NavBar>

                {this.state.isImgClick&&<ImageContainer currentImg={this.state.currentImg} picClose={this.picClose}/>}

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}

                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}

                    renderRow={row}
                    renderSeparator={separator}

                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    className="am-list"
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        );
    }
}

export default withAuthentication(MyPosts);

