import React from 'react';

import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';

import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';

import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <div>

            <Switch>

            {/*<Route path={ROUTES.SIGN_UP} component={SignUpPage} />*/}
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            {/*<Route path={ROUTES.ACCOUNT} component={AccountPage} />*/}
            <Route path={ROUTES.ADMIN} component={AdminPage} />

            {/*<Route path={ROUTES.EDITAVATAR} component={EditAvatar}/>*/}
            <Redirect to={ROUTES.POSTPAGE}/>
            </Switch>
        </div>
    </Router>
);
export default withAuthentication(App);