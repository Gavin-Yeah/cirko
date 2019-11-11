import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { compose } from 'recompose';
import {Button, InputItem}from 'antd-mobile'
import { withFirebase } from '../Firebase';
const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = {};
        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                            username,
                            email,
                            roles,
                        },
                        {merge: true},
                    );
            })
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();



    }
    onChangeUsername = event => {
        this.setState({ username: event});
    };
    onChangeEmail = event => {
        this.setState({ email: event });
    };
    onChangePasswordOne = event => {
        this.setState({ passwordOne: event });
    };
    onChangePasswordTwo = event => {
        this.setState({ passwordTwo: event });
    };


    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            isAdmin,
        } = this.state;


        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form >
                <InputItem
                    name="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    type="text"
                    placeholder="Full Name"
                ></InputItem>
                <InputItem
                    name="email"
                    value={email}
                    onChange={this.onChangeEmail}
                    type="text"
                    placeholder="Email Address"
                ></InputItem>
                <InputItem
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChangePasswordOne}
                    type="password"
                    placeholder="Password"
                ></InputItem>
                <InputItem
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChangePasswordTwo}
                    type="password"
                    placeholder="Confirm Password"

                ></InputItem>



                <Button disabled={isInvalid} type={"primary"} onClick={this.onSubmit}>Sign Up</Button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <Button>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </Button>
);
const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };