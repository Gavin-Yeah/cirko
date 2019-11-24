function get_all_post_by_id(firebase,user_id, callback){
    get_all_post_id_from_db(firebase,user_id, callback);
}

function get_all_liked_posts(firebase, user_id, callback){
    var db = firebase.db;
    var docRef = db.collection("users").doc(user_id);
    //get user
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:");
            get_posts_from_post_ID_list(firebase,doc.data().likes, callback);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });
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

const get_post = (firebase,post_id,callback) => {
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

    let promise = new Promise(function(resolve, reject){
        var list_posts = [];
        help_get_all_post(firebase, (post)=>{list_posts.unshift(post);

            resolve(list_posts)

        })

    });
    promise.then((data)=>{
        console.log(data)
        callback(data);
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




// function fliter(firebase,list_posts, distance, user_location, callback){
//     let location_str = "";
//     let mydestinations = [];
//     console.log(list_posts);
//     for(let i = 0; i<list_posts.length; i++) {
//         mydestinations.push(new google.maps.LatLng(list_posts[i].location.lat, list_posts[i].location.lng));
//     }
//     let ori = new google.maps.LatLng(user_location.lat, user_location.lng);
//     var service = new google.maps.DistanceMatrixService();
//     let return_list = [];
//     service.getDistanceMatrix(
//         {
//             origins: user_location,
//             destinations: mydestinations,
//             travelMode: 'WALKING'
//         }, ()=>{return_list = fliter_help(response, status, distance, list_posts)
//             callback(return_list);
//         });
// }
//
// function fliter_help(response, status, dis, list_posts) {
//     let distances = [];
//     let return_list = [];
//     if (status == 'OK') {
//         var origins = response.originAddresses;
//         var destinations = response.destinationAddresses;
//
//         for (var i = 0; i < origins.length; i++) {
//             var results = response.rows[i].elements;
//             for (var j = 0; j < results.length; j++) {
//                 var element = results[j];
//                 var distance = element.distance.text;
//                 distances.push(distance);
//                 var duration = element.duration.text;
//                 var from = origins[i];
//                 var to = destinations[j];
//             }
//         }
//
//         for(let i = 0; i < distances.length; i++) {
//             if(distances[i] < dis) {
//                 return_list.push(list_posts[i]);
//             }
//         }
//         return return_list;
//     }
//     return return_list;
// }








export {get_all_post_by_id,get_all_post, get_post,get_all_liked_posts}