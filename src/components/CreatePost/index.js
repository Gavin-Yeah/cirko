import React, {Component} from 'react';
import {withAuthentication} from "../Session";
import {NavBar, Button, Icon, List, TextareaItem, Flex,ImagePicker, WingBlank} from 'antd-mobile'
import add from "../icons/add.png";
import { get_user_profile, savePostToDB } from "../Firebase/upload";

class CreatePost extends Component {
    state = {
        content:'',
        files:[],
       location:'',


    }
    contentRef =  React.createRef();
    add = ()=>{
        let {addPost} = this.props
        let content = this.contentRef.current.value;
        const postObj = {id:4,userName:'Jack',time:'10:31 10/10/2019',content: content, pics:[], likes:0}
        addPost(postObj)
        this.setState({
            content:'',
            pics:[],
            multiple:true
        })

    }
    onChange = event => {
        this.setState({ content: event });
    };
    onConfirm = ()=>{

        const firebase = this.props.firebase;
        const uid = firebase.auth.currentUser.uid;
        const username = firebase.auth.currentUser.displayName;
        const callback = ({posts_num})=>{
            savePostToDB(firebase,uid,username,posts_num,this.state.content,this.state.location,this.state.files,()=>{
                this.props.history.goBack();
            })
        }
         get_user_profile(firebase,uid,callback)



        //this.props.history.goBack()
    }

    onChangePic = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    onAddImageClick = (e) => {
        e.preventDefault();
        this.setState({
            files: this.state.files.concat({
                url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                id: '3',
            }),
        });
    };
    onTabChange = (key) => {
        console.log(key);
    };
    render() {

        const {onAddCanceledHandler} = this.props
        let {content,files} = this.state
        return (
            <div>
                <NavBar
                    style={{backgroundColor: '#5396a5', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"70px",position:'fixed',width:"100%", top:0,zIndex:1}}
                    mode="light"
                    leftContent={
                        <div onClick={()=>  this.props.history.goBack()}  style={{width: '40px',marginTop:"-20px", marginLeft:'5px', color:'White', fontSize:'40px',fontWeight: 'bold'}}> &lt;
                        </div>
                    }


                    rightContent={
                        <div onClick={this.onConfirm}  style={{width: '40px',marginTop:"-20px",}}><img src={add} style={{width:"50px"}} alt="add"/>
                        </div>

                    }
                ><h1 style={{color:"white",}}>Post</h1>

                </NavBar>


                <List>
                    <div style={{height:'70px' ,background:'white'}}></div>
                    <TextareaItem

                        placeholder={"What's happening?"}
                        autoHeight
                        labelNumber={5}
                        onChange={this.onChange}
                        rows={5}
                        count={300}
                    />
                </List>
                <Flex>
                    <Flex.Item>
                        <Button  type="ghost" inline size="small" className="am-button-borderfix">
                            <img src="https://image.flaticon.com/icons/png/128/149/149060.png" style={{width:'15px'}}  alt=""/>
                            Your Position</Button>
                    </Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <WingBlank>

                    <ImagePicker
                        files={files}
                        onChange={this.onChangePic}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple={this.state.multiple}
                    />
                </WingBlank>

                </div>

        );
    }
}
export default withAuthentication(CreatePost);