import React from 'react';

import {
    HashRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';


import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Home/Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import Comments from "../Comments";
import AddComment from '../Comments/AddComment'
import { withFirebase } from '../Firebase';
//the user data is stored in App props
import EditAvatar from '../Home/Account/EditAvatar'
import { withAuthentication } from '../Session';
import {EDITAVATAR} from "../../constants/routes";
import CreatePost from '../CreatePost'
import MyPosts from "../Home/Account/MyPosts";
import FavPosts from "../Home/Account/FavPosts";
import {TabBar} from "antd-mobile";
const App = () => (
    <Router>
        <div>


            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            {/*<Route path={ROUTES.ACCOUNT} component={AccountPage} />*/}
            <Route path={ROUTES.ADMIN} component={AdminPage} />

            {/*<Route path={ROUTES.EDITAVATAR} component={EditAvatar}/>*/}
            <Redirect to={ROUTES.POSTPAGE}/>
        </div>
    </Router>
);
export default withAuthentication(App);