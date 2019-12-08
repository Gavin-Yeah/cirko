import React, { Component } from 'react';

class ImageContainer extends Component {

    render() {
        return (
            <div align={"center"}  style={{backgroundColor: 'lightgrey',  height:"100vh",position:'fixed',width:"100vw", top:"0",zIndex:100}} onClick={this.props.picClose}>

                <img src={this.props.currentImg} style={{ marginTop:'1vh',width:"70%"}}/>
                {/*<div style={{marginTop: '30px'}}><button onClick={this.props.picClose} >x</button></div>*/}
            </div>

        );
    }
}

export default ImageContainer;