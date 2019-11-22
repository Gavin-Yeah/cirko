import React, {Component} from 'react';
import {Icon, ImagePicker, NavBar, WingBlank,Button} from 'antd-mobile';
import * as ROUTES from "../../../../constants/routes";
import { withFirebase } from '../../../Firebase';
import {updateImage} from '../../../Firebase/upload'
import { compose } from "recompose";
import { withAuthentication } from "../../../Session";


const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
}, ];
class EditAvatar extends Component {
    state = {
        files: data,
        multiple: false,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    onClick=()=>{
        let {files} = this.state;
        // this.props.firebase.auth.currentUser.updateProfile({
        //     photoURL:files[0]
        // })
        updateImage(this.props.firebase,this.props.firebase.auth.currentUser.uid,files[0].file).then((data)=>{
            console.log(data);
           this.props.history.goBack();
        });



    }
    componentDidMount() {
        const imageUrl = this.props.firebase.auth.currentUser.photoURL;
        console.log(imageUrl)
        this.setState({
            files:[
                {url:imageUrl}
            ]
        },()=>{
            console.log(this.state)
        })
    }

    render() {



        return (
            <div >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}

                >Update Avatar</NavBar>
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 1}
                    multiple={this.state.multiple}
                />
                <Button type={"primary"} onClick={this.onClick}>Confirm</Button>
            </div>
        );
    }
}

export default withAuthentication(EditAvatar);