import app from 'firebase/app';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyBe_xhmWjfHamz-lm8F6uFEN3S8F-gJQQU",
    authDomain: "my-project-1571785426296.firebaseapp.com",
    databaseURL: "https://my-project-1571785426296.firebaseio.com",
    projectId: "my-project-1571785426296",
    storageBucket: "my-project-1571785426296.appspot.com",
    messagingSenderId: "770834374142",
    appId: "1:770834374142:web:1c21075f3c925214d434af",
    measurementId: "G-Q0Q78JXJ5E"
};
class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}
export default Firebase;