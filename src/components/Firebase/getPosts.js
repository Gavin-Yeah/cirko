function get_all_post_by_id(firebase,user_id, callback){
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
function get_all_post(firebase, callback){
    var list_posts = [];
    let promise = new Promise(function(resolve, reject){
        help_get_all_post(firebase, (post)=>{list_posts.unshift(post);})
        resolve()
    });
    promise.then(()=>{
        callback(list_posts);
    })

}

function help_get_all_post(firebase, callback) {
    var db = firebase.db;
    db.collection("posts").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            callback(doc.data());
        });
    });
}
export {get_all_post_by_id,get_all_post}