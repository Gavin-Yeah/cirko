import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignUpLink } from '../SignUp';
import "./index.css"
import { Button, InputItem, List, WhiteSpace } from 'antd-mobile';

const SignInPage = () => (
    <div>
      <div className={"icon1"}>
          <img className={"image"} src={require("../icons/cirko-trans.png")} alt=""/>
      </div>
        <div className={"icon2"}>
            <h2 className={"appName"}>CIRKO</h2>
        </div>
        <SignInForm />
        <br/>
        <SignInGoogle />
        <br/>
        {/*<PasswordForgetLink />*/}
        <SignUpLink />
    </div>
);
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onPasswordChange = event => {
         this.setState({ password: event});

    };
    onEmailChange = event => {
        this.setState({ email: event });

    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <div >

            <List>
                <InputItem

                        name="email"
                        value={email}
                        onChange={this.onEmailChange}
                        type="text"
                        placeholder="Email Address"

                ></InputItem>

                <WhiteSpace/>
                <InputItem

                        name="password"
                        value={password}
                        onChange={this.onPasswordChange}
                        type="password"
                        placeholder="Password"

                ></InputItem>
            </List>
                <WhiteSpace/>

                <WhiteSpace/>
                <List>
                <Button  type="warning" onClick={this.onSubmit}>
                    Sign In
                </Button>
                {error && <p>{error.message}</p>}
                </List>
            </div>
        );
    }
}



class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: {},
                            avatarUrl:socialAuthUser.user.photoURL,
                            userId:socialAuthUser.user.uid,

                    },
                        { merge: true });
            })
            .then(socialAuthUser => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.POSTPAGE);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <div  >
                <Button  type={'submit'} onClick={this.onSubmit}  >
                   <div style={{textAlign:"top", alignItems:'center'}}>
                    <img className={"googleIcon"} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt=""/>
                       <span className={"google"}>Sign In with Google</span>
                   </div>
                   </Button>
                {error && <p>{error.message}</p>}
            </div>
        );
    }
}




const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);


const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

export default SignInPage;
export { SignInForm };