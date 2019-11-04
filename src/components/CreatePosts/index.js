import React, {Component} from 'react';

class Index extends Component {
    contentRef =  React.createRef();
    add = ()=>{
        let content = this.contentRef.current.value.trim();
    }
    render() {
        return (
            <div>
                <div>header
                    <button onClick={this.add}>submit</button></div>
                <div><textarea name="textarea" id="" cols="30" rows="10" ref={this.contentRef} placeholder="comments"></textarea>
                <div>pictures</div>
                    <div>
                        <button>add pics</button>
                        <button>show location?</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;