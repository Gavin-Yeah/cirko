import React, { Component } from 'react';
import { withFirebase } from '../../../Firebase';
import {List,Button,InputItem}from 'antd-mobile'
const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { passwordOne } = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChangePassword = event => {
        this.setState({ passwordOne: event });
    };
    onChangeConfirm = event => {
        this.setState({ passwordTwo: event });
    };
    render() {
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';
        return (
            <List>
                <InputItem
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChangePassword}
                    type="password"
                    placeholder="New Password"
                />
                <InputItem
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChangeConfirm}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <Button disabled={isInvalid} type="submit" onClick={this.onSubmit}>
                    Reset My Password
                </Button>
                {error && <p>{error.message}</p>}
            </List>
        );
    }
}
export default withFirebase(PasswordChangeForm);