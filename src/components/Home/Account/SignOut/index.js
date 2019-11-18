import React from 'react';
import { withFirebase } from '../../../Firebase';
import {Button} from "antd-mobile";

const SignOutButton = ({ firebase }) => (
    <Button type="warning" onClick={firebase.doSignOut}>
        Sign Out
    </Button>
);
export default withFirebase(SignOutButton);