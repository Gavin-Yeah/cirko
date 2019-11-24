import { Button, Flex, ImagePicker, ListView, NavBar } from 'antd-mobile';
import React from "react";

import add from "../icons/add.png";
import { get_post } from "../Firebase/getPosts";
import withAuthentication from "../Session/withAuthentication";

const data = [
    {

        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
        time: '02/29/2010',
        id: 1,
    },
    {

        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
        time: '02/29/2010',
        id: 2,
    },
    {

        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
        time: '02/29/2010',
        id: 3,
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

 class Comments extends React.Component {
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
            height: document.documentElement.clientHeight,
            data:[]
        };
    }

    componentDidMount() {
       const callback = (data)=>{
           this.setState({
               data:data.comments
           })
        }
        get_post(this.props.firebase, this.props.match.params.id,callback);
    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({isLoading: true});
        setTimeout(() => {
            this.rData = {...this.rData, ...genData(++pageIndex)};
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }


    onClickAdd = () => {
        //console.log(this.props.match.params.id)
        this.props.history.push(`/home/addcomment/${this.props.match.params.id}`);
    }

    render() {
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
                <div key={rowID} style={{padding: '0 15px'}}>
                    {rowID==0?  <div style={{height:'70px' ,background:'white'}}></div>:<div/> /*show the 1st post completely*/}


                    <div>
                        <Flex style={{padding: '15px 0'}}>
                            <img style={{height: '64px', marginRight: '15px'}} src={obj.img} alt=""/>
                            <div style={{lineHeight: 1}}>

                                <div><span
                                    style={{fontSize: '20px', color: '#4e77a1', fontWeight: 'bold'}}>{obj.title}</span>
                                </div>
                                <div style={{
                                    color: '#5396a5',
                                    fontSize: '18px',
                                    marginBottom: '8px',
                                    marginTop: '5px'
                                }}>{obj.time}</div>
                            </div>
                        </Flex>
                        <Flex>
                            <div style={{marginBottom: '8px', fontWeight: 'bold'}}>{obj.des}</div>
                        </Flex>
                    </div>
                    {/*<Flex>*/}

                    {/*    <Flex.Item><Button>Like</Button></Flex.Item>*/}
                    {/*</Flex>*/}
                </div>
            );
        };
        return (
            <div>
                <NavBar
                    style={{backgroundColor: '#5396a5', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"7vh",position:'fixed',width:"100%", top:0,zIndex:1}}
                    mode="light"
                    leftContent={
                        <div onClick={()=>  this.props.history.goBack()}  style={{width: '40px',marginTop:"-20px", marginLeft:'5px', color:'White', fontSize:'40px',fontWeight: 'bold'}}> &lt;
                    </div>
                        }


                    rightContent={
                        <div onClick={this.onClickAdd}  style={{width: '40px',marginTop:"-10px",}}><img src={add} style={{width:"40px"}} alt="add"/>
                        </div>

                    }
                ><h1 style={{color:"white",}}>comments</h1></NavBar>
                <div>
                    {
                        this.state.data.map((obj,index)=>{
                            return(
                                <div key={index} style={{padding: '0 15px', marginBottom:'5px', background:'white'}}>
                                    {index==0?  <div style={{height:'70px' ,background:'white'}}></div>:<div/> /*show the 1st post completely*/}


                                    <div>
                                        <Flex style={{padding: '15px 0'}}>
                                            <img style={{height: '64px', marginRight: '15px'}} src={obj.comment_user_avatar} alt=""/>
                                            <div style={{lineHeight: 1}}>

                                                <div><span
                                                    style={{fontSize: '20px', color: '#4e77a1', fontWeight: 'bold'}}>{obj.comment_user_name}</span>
                                                </div>
                                                <div style={{
                                                    color: '#5396a5',
                                                    fontSize: '18px',
                                                    marginBottom: '8px',
                                                    marginTop: '5px'
                                                }}>{obj.time}</div>
                                            </div>
                                        </Flex>
                                        <Flex>
                                            <div style={{marginBottom: '8px', fontWeight: 'bold'}}>{obj.content}</div>
                                        </Flex>
                                    </div>
                                    {/*<Flex>*/}

                                    {/*    <Flex.Item><Button>Like</Button></Flex.Item>*/}
                                    {/*</Flex>*/}
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        );
    }
}
export default withAuthentication(Comments);
