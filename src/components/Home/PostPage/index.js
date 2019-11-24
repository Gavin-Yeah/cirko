/* eslint no-dupe-keys: 0 */
import { ListView, NavBar, Button, Flex, Toast, Slider, Icon, ImagePicker, InputItem, List, Switch } from 'antd-mobile';
import React from 'react'


import * as ROUTES from "../../../constants/routes";
import add from "../../icons/add.png";
import { get_all_post, get_all_post_by_uid } from "../../Firebase/getPosts";
import { get_location } from "../../utils/getLocation";
import { withAuthentication } from "../../Session";
import ImageContainer from "../../ImageContainer";
import NavBar1 from "../NavBar1";
import { likes } from "../../Firebase/upload";
// let data = [
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//         title: 'Meet hotel',
//         des: '不是所有的兼职汪都需要风吹日晒',
//         time: '11/12/2019',
//         likes:5,
//         id:1,
//         comments:[],
//         location:''
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//         title: 'McDonald\'s invites you',
//         des: '不是所有的兼职汪都需要风吹日晒',
//         time: '11/12/2019',
//         likes:5,
//         id:2,
//         comments:[],
//         location:'New Zealand'
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//         title: 'Eat the week',
//         des: '不是所有的兼职汪都需要风吹日晒',
//         time: '11/12/2019',
//         likes:5,
//         id:3,
//         comments:[],
//         location:''
//     },
// ];

let pageIndex = 0;




class PostPage extends React.Component {


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
            distance:1000,
            currentImg:'',
            isImgClick:false,
            hasMore:false,
            data:[]
        };
    }
    genData =(pIndex = 0)=> {
        const dataBlob = {};
        for (let i = 0; i < this.state.data.length; i++) {
            const ii = (pIndex *  this.state.data.length) + i;
            dataBlob[`${ii}`] = `row - ${ii}`;
        }
        return dataBlob;
    }
    renderItems = ()=>{
        this.setState({
            isLoading:true
        })
        get_location((location)=>{


            const callback = (list)=>{

                list.sort((a,b)=>{

                    return Date.parse(a.time)>=Date.parse(b.time)?-1:1})
                let fliter = this.props.firebase.functions.httpsCallable("fliter");

                //console.log(this.state.location)
               // console.log(list[1])
                fliter([list,this.state.distance,location]).then( (result)=> {
                    // Read result of the Cloud Function.

                    result.data.sort((a,b)=>{

                        return Date.parse(a.time)>=Date.parse(b.time)?-1:1})
                    console.log(result.data)
                  this.setState({
                          data:result.data,
                            isLoading:false
                  }

                  )
                }).catch(function (error) {
                    // Getting the Error details.
                    var code = error.code;
                    var message = error.message;
                    var details = error.details;
                    console.log("filtererr"+code);
                    console.log(message);
                    console.log(details);

                });



                this.setState({
                    data:list
                })

            }





            this.setState({
                location:location
            }, ()=> get_all_post(this.props.firebase,callback))





        })
    }

    componentDidMount() {

        this.renderItems();

        //console.log(a)
        

       // console.log(this.props.firebase.db.collection("posts").get())
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax

    }

    check = ()=>{
        this.renderItems();

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

likes = (postId)=>{

    likes(this.props.firebase,this.props.firebase.auth.currentUser.uid,postId).then((result)=>{
        console.log(result,postId);
        this.renderItems()

    }).catch(err=>{
        console.log(err.toString())
    });

}


    slider =(e)=>{
        //  console.log(e)
        this.setState({
            distance:e
        })
    }

    render() {
        if(this.state.isLoading){
            Toast.loading('Loading...', 0.5, () => {
                console.log('Load complete !!!');
            });
        }

        let index = this.state.data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.data.length - 1;
            }
            const obj = this.state.data[index--];
            return (


                <div key={rowID} style={{ padding: '0 15px' }}>
                    {rowID==0?  <div style={{height:'10vh' ,background:'white'}}></div>:<div/> /*show the 1st post completely*/}
                    <div
                        style={{
                            lineHeight: '40px',
                            color: '#888',
                            fontSize: 15,
                            borderBottom: '1px solid #F6F6F6',
                            background:'white'
                        }}
                    >{obj.place}</div>
                    <div>
                        <Flex style={{  padding: '15px 0' }}>
                            <img style={{ height: '64px', marginRight: '15px' }} src={obj.userAvatar} alt="" />
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
                       <Flex.Item><Button size='small' style={{background:'#5396a5' ,color:"#ecfcee",fontWeight: 'bold'}} onClick={()=> this.onClickComment(obj.postId)}>Comment</Button></Flex.Item>
                   <Flex.Item><Button size='small' style={{background:'#5396a5',color:"#ecfcee",fontWeight: 'bold'}} onClick={this.likes}>Likes {!!!obj.likes?'('+obj.likes+')':""}</Button></Flex.Item>
                   </Flex>
                </div>
            );
        };



        return (
            <div >
                {this.state.isImgClick&&<ImageContainer currentImg={this.state.currentImg} picClose={this.picClose}/>}
               <NavBar1 history={this.props.history}/>

                <Flex style={{ background: "white",height:"8vh",position:'fixed',width:"100%", top:"3vh",zIndex:1}}>
                    <Flex.Item style={{flex:'8'}}>
                        <Slider
                        style={{marginLeft:"10px",marginTop:'3vh'}}
                    defaultValue={this.state.distance*1}
                    min={0}
                    max={30000}
                    step={100}
                    value={this.state.distance}
                    onChange={(e)=>this.slider(e)}
                />

                </Flex.Item>
                    <Flex.Item style={{flex:'3.5',marginTop:'3vh',marginRight:'-1vw',fontSize:"20px", background:'rgba(0,0,0,0)'} }>
                        <InputItem
                            type="number"
                            onChange={(e)=>{this.setState({distance:e})}}
                            value={this.state.distance}
                            extra="m"
                            style={{background:'#f7f7f7'}}
                        />
                    </Flex.Item>
                    <Flex.Item style={{flex:'1'}} >
                       <Icon onClick={this.check} size='small' style={{borderRadius:'100%',background:"#fbfbfb",marginTop:'3vh', textAlign:'center',width:'30px' ,fontSize:"4vh"} }type={'check'} />
                    </Flex.Item>
                </Flex>
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
                                  <Flex.Item><Button size='small' activeStyle={{background:'#4e77a1'}} style={{background:'#5396a5' ,color:"#ecfcee",fontWeight: 'bold'}} onClick={()=> this.onClickComment(obj.postId)}>Comment({obj.comments.length})</Button></Flex.Item>
                                  <Flex.Item><Button size='small' activeStyle={{background:'#4e77a1'}} style={{background:'#5396a5',color:"#ecfcee",fontWeight: 'bold'}} onClick={()=>this.likes(obj.postId)}>Likes {obj.likes!==0?'('+obj.likes.length+')':""}</Button></Flex.Item>
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

export default withAuthentication(PostPage);

