import React, { Component } from 'react';
import { withAuthentication } from "../Session";
import { ImagePicker, List, NavBar, Switch, TextareaItem, WingBlank } from 'antd-mobile'
import add from "../icons/add.png";
import { get_user_profile, savePostToDB } from "../Firebase/upload";
import { get_location } from "../utils/getLocation";


class CreatePost extends Component {
    state = {
        content: '',
        files: [],
        location: '',
        isSwitched:false


    }
    contentRef = React.createRef();
    add = () => {
        let { addPost } = this.props
        let content = this.contentRef.current.value;
        const postObj = { id: 4, userName: 'Jack', time: '10:31 10/10/2019', content: content, pics: [], likes: 0 }
        addPost(postObj)
        this.setState({
            content: '',
            pics: [],
            multiple: true
        })

    }


    onChange = event => {
        this.setState({ content: event });
    };

    onConfirm = () => {
        get_location((location)=> {

            const firebase = this.props.firebase;
            const uid = firebase.auth.currentUser.uid;
            const username = firebase.auth.currentUser.displayName;
            const callback = ({posts_num}) => {
                console.log(location);
                let geocodeLatLng = firebase.functions.httpsCallable("geocodeLatLng");

                geocodeLatLng(location).then( (result)=> {
                    // Read result of the Cloud Function.
                    let place = null;
                    if(this.state.isSwitched){
                        place = result.data;
                    }
                    savePostToDB(firebase,uid,username,posts_num||0,this.state.content,this.state.files,location,place,() => {

                        this.props.history.goBack();
                    })

                }).catch( (error) => {
                    // Getting the Error details.
                    var code = error.code;
                    var message = error.message;
                    var details = error.details;
                    console.log(code);
                    console.log(message);
                    console.log(details);
                    // ...
                });


            }



                get_user_profile(firebase, uid, callback);

        })



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

        const { onAddCanceledHandler } = this.props
        let { content, files } = this.state
        return (
            <div>
                <NavBar

                    style={{backgroundColor: '#5396a5', borderBottomLeftRadius:'100%', borderBottomRightRadius:'100%',  height:"7vh",position:'fixed',width:"100%", top:0,zIndex:1}}

                    mode="light"
                    leftContent={
                        <div onClick={() => this.props.history.goBack()} style={{ width: '40px', marginTop: "-20px", marginLeft: '5px', color: 'White', fontSize: '40px', fontWeight: 'bold' }}> &lt;
                        </div>
                    }


                    rightContent={

                        <div onClick={this.onConfirm}  style={{width: '40px',marginTop:"-10px",}}><img src={add} style={{width:"40px"}} alt="add"/>

                        </div>

                    }
                ><h1 style={{ color: "white", }}>Post</h1>

                </NavBar>


                <List>
                    <div style={{ height: '70px', background: 'white' }}></div>
                    <TextareaItem

                        placeholder={"What's happening?"}
                        autoHeight
                        labelNumber={5}
                        onChange={this.onChange}
                        rows={5}
                        count={300}
                    />
                </List>
                <div>

                    <List.Item
                        style={{background:"transparent"}}
                        thumb={"https://image.flaticon.com/icons/png/128/149/149060.png"}
                        extra={<Switch
                            checked={this.state.isSwitched}
                            onChange={()=>{this.setState({isSwitched:!this.state.isSwitched})}}
                            platform="android"
                            color={"#5396a5"}

                        />}
                    ><span style={{color:"#5396a5"}}>Your Position</span></List.Item>

                </div>
                <WingBlank>

                    <ImagePicker
                        files={files}
                        onChange={this.onChangePic}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 9}
                        multiple={true}
                    />
                </WingBlank>

            </div>

        );
    }
}
export default withAuthentication(CreatePost);