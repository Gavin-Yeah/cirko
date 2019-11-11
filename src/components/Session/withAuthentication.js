import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: JSON.parse(localStorage.getItem('authUser')),
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    //browser's local storage stores the authUser
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.setState({ authUser });
                },
                () => {
                    localStorage.removeItem('authUser');
                    this.setState({ authUser: null });
                },
            );
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }

        componentWillUnmount() {
            this.listener();
        }
    }
    return withFirebase(WithAuthentication);
};
export default withAuthentication;