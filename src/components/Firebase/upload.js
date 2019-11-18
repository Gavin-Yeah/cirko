import { withFirebase } from '../Firebase';
// Your web app's Firebase configuration

// Initialize Firebase


//when user select a picture as a (head-pic)? save it to the storage
function updateImage(firebase, user_ID, Image, callback) {
    //get the storage reference
    var storage = firebase.storage;
    var storageRef = storage.ref('images/' + user_ID + '.jpg');
    //store image to storage
    storageRef.put(Image).then(function (snapshot) {
        storageRef.getDownloadURL().then((url) => {
            firebase.auth.currentUser.updateProfile({
                photoURL: url
            }).then(() => {
                console.log("succeed")
                callback()
            }).catch((err) => {
                console.log("err", err)
            })
        })
    });

}

//when user wants to save his profile
//if no picture selected before? should we just create a no pic?
function updateUserName(firebase, user_ID, user_name/*...*/, callback) {
    var db = firebase.db;
    db.collection("users").doc(user_ID).set({
        userID: user_ID,
        username: user_name,
        following: [],
        followers: [],
        posts: [],
        posts_num: 0
        /*...*/
    })
        .then(function (docRef) {
            firebase.auth.currentUser.updateProfile({
                displayName: user_name,
            }).then(() => {
                callback()
            }).catch((err) => {
                console.log("err", err)
            })
        })
        .catch(function (error) {
            console.error("Error writing user profile to db", error);
        });


}

//follower wants to follow followed...Or any better name?
function follow(firebase, follower_id, followed_id) {
    //get the database reference
    var db = firebase.firestore();
    db.collection("users").doc(follower_id).update({
        following: firebase.firestore.FieldValue.arrayUnion(followed_id)
    })
    db.collection("users").doc(followed_id).update({
        followers: firebase.firestore.FieldValue.arrayUnion(follower_id)
    })
}

//when user share a post and then you will need to save it to the database
// passing a user obj? and a post object will be a better option.
// post_id = user_id + "_post_" + posts_num.toString();!!! important
function savePostToDB(firebase, user_id, posts_num, content, location, pictures, callback) {
    //get the database reference
    var db = firebase.firestore();
    //generate post id
    var post_id = user_id + "_post_" + posts_num.toString();
    posts_num = posts_num + 1;
    //generate time
    var myDate = new Date();
    var time = myDate.toLocaleString();

    //store post into post db
    db.collection("posts").doc(post_id).set({
        userID: user_id,
        content: content,
        location: location,
        pictures_url: [],
        comments: [],
        likes: [],
        time: time
    });

    //store images and update the url of pictures in database
    save_multiple_image(firebase, post_id, pictures);

    //update user data base
    db.collection("users").doc(user_id).update({
        posts: firebase.firestore.FieldValue.arrayUnion(post_id),
        posts_num: posts_num
    }).then(
        callback())
}


//when user select a picture as a (head-pic)? save it to the storage
function save_multiple_image(firebase, post_id, Images) {
    //get the storage reference
    var storage = firebase.storage();
    var db = firebase.firestore();
    for (var i = 0; i < Images.length; i++) {
        var storageRef = storage.ref('images/' + post_id + '_' + i.toString() + '.jpg');
        //store image to storage
        storageRef.put(Images[i]).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (url) {
                //update the url in DB
                db.collection("posts").doc(post_id).update({
                    pictures_url: firebase.firestore.FieldValue.arrayUnion(url)
                })
            })
                .catch(function (error) {
                    console.error("Error writing get URL for the image", error);
                });
        });
    }
}


//comments
function comments(firebase, comment_user_id, content, post_id) {
    //get the database reference
    var db = firebase.firestore();
    //create a comment object
    var comment = {content: content, comment_user_id: comment_user_id, post_id: post_id};
    //update database
    db.collection("posts").doc(post_id).update({comments: firebase.firestore.FieldValue.arrayUnion(comment)});
}

//

//like
function likes(firebase, like_user_id, post_id) {
    //get the database reference
    var db = firebase.firestore();
    //update database
    db.collection("posts").doc(post_id).update({likes: firebase.firestore.FieldValue.arrayUnion(like_user_id)});
}


export { updateImage, updateUserName, comments, follow, savePostToDB }