import React, {Component} from 'react';

class Item extends Component {

    render() {
        let{id, userName,time,comments,content,likes,location,pics}= this.props;
        return (
            <div>
              <div>
                  <div>{userName}</div>
                  <div>time</div>
              </div>
                <div><p>{content}</p>
                <div>{
                    pics.map((item)=>{
                  return (<img src={item.url} alt="pic"/>)
                })
                }</div>
                <div>
                    <button>
                        {likes}
                    </button>
                    <button comments={comments}>comments</button></div></div>
            </div>
        );
    }
}

export default Item;