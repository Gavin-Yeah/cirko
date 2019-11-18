function get_all_post(firebase,user_id, callback){
    get_all_post_id_from_db(firebase,user_id, callback);
}


function get_all_post_id_from_db(firebase,user_id, callback){
    //get db reference
    var db = firebase.db;
    var docRef = db.collection("users").doc(user_id);
    //get user
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:");
            get_posts_from_post_ID_list(firebase,doc.data().posts, callback);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });
}

function get_posts_from_post_ID_list(firebase,pID_list, callback){
    for (var i=0;i<pID_list.length;i++)
    {
        get_post(firebase,pID_list[i], callback);
    }
}

function get_post(firebase,post_id,callback) {
    //get db reference
    var db = firebase.db;
    var docRef = db.collection("posts").doc(post_id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:");
            callback(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });
}
export {get_all_post}