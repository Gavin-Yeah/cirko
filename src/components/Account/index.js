import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';//import authorization
const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account: {authUser.email}</h1>
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;  //set condition
export default withAuthorization(condition)(AccountPage);