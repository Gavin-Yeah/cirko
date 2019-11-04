import React, {Component} from 'react';
import './index.css'
import * as ROUTES from "../../constants/routes";
class Item extends Component {


    onClickCommentHandler = ()=>{
        const {toCommentPage}=this.props;
        toCommentPage();
    }
    render() {
        let{id, userName,time,comments,content,likes,location,pics}= this.props;

        return (
            <div>
              <div>
                  <div>{userName}</div>
                  <div>{time}</div>
              </div>
                <div><p>{content}</p>
                <div>{
                    pics.map((item)=>{
                  return (<img  key={item.imgId} src={item.imgUrl} alt="pic"/>)
                })
                }</div>
                <div>
                    <button>
                        {likes}
                    </button>
                    <button comments={comments} onClick={this.onClickCommentHandler}>comments</button></div></div>
            </div>
        );
    }
}

export default Item;