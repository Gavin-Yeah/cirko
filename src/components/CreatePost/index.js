import React, {Component} from 'react';
import {withAuthorization} from "../Session";
import {NavBar, Button, Icon, List, TextareaItem, Flex,ImagePicker, WingBlank} from 'antd-mobile'
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];
class CreatePost extends Component {
    state = {
        content:'',
        files:data,


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
        this.props.history.goBack()
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
                    mode="light"
                    icon={<Icon type="cross-circle" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                    rightContent={
                        <div onClick={this.onConfirm}><Icon key="0" type="check-circle-o"  />
                        </div>
                    }
                >Text</NavBar>
                <List>
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
export default CreatePost;