import React from 'react';
import { withAuthorization } from '../Session';
import Item from "../Item";
class HomePage extends React.Component{

    state={
        posts:[{
            id:'1',
            userName:'',
            time:'',
            comments:[],
            content:null,
            likes:0,
            location:'',
            pics:[]
        }]
    }

    render() {
        return(
            <div>
                <h1>Home Page</h1>
                <p>The Home Page is accessible by every signed in user.</p>
                {this.state.posts.map((item)=>{
                    return(<Item key={item.id} {...item}/>)
                })
                }
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);