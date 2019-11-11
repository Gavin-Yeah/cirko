import React, {Component} from 'react';
import {NavBar, Icon, List,InputItem,Button} from "antd-mobile";

class EditName extends Component {
    render() {
        return (
            <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}



            >NavBar</NavBar>
                <List renderHeader={() => 'Not editable / Disabled'}>
                    <InputItem
                        value="not editable"

                    >Name</InputItem>
                    <Button type={"primary"}>Done</Button>
                </List>
            </div>
        );
    }
}

export default EditName;