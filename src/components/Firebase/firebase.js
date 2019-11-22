import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions'


const config = {
    apiKey: "AIzaSyDCldN3MV9CCn8Pw-k2tJKJJC9UHBmVqu0",
    authDomain: "cirko-74c69.firebaseapp.com",
    databaseURL: "https://cirko-74c69.firebaseio.com",
    projectId: "cirko-74c69",
    storageBucket: "cirko-74c69.appspot.com",
    messagingSenderId: "382100265256",
    appId: "1:382100265256:web:1920997e2f94dc5156d81d",
    measurementId: "G-58D51K9P8H"
};
class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.storage = app.storage();
        this.fieldValue = app.firestore.FieldValue;
        this.functions = app.functions();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);



    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const dbUser = snapshot.data();

                        // default empty roles

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });


    // *** User API ***
    user = uid => this.db.doc(`users/${uid}`);
    users = () => this.db.collection('users');


}
export default Firebase;
