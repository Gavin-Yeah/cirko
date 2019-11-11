import React, {Component} from 'react';
import {Icon, ImagePicker, NavBar, WingBlank,Button} from 'antd-mobile';
import * as ROUTES from "../../constants/routes";



const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
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

    }

    render() {
        const { files } = this.state;
        return (
            <div >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.replace("/home/account")}}

                >NavBar</NavBar>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 1}
                    multiple={this.state.multiple}
                />
                <Button onClick={this.onClick}>Confirm</Button>
            </div>
        );
    }
}

export default EditAvatar;