// function upload_user_profile(userID, Image /*...*/) {
//
//     //get the storage reference
//     var storage = firebase.storage();
//     var storageRef = storage.ref('images/'+userID+'.jpg');
//     //store image to storage
//     storageRef.put(Image).then(function(snapshot) {
//         console.log('Uploaded a blob or file!');
//         //get the url to the storage
//         storageRef.getDownloadURL().then(function(t) {
//             //get the database reference
//             var db = firebase.firestore();
//             db.collection("users").add({
//                 user_id: userID,
//                 image_url: t
//             })
//                 .then(function(docRef) {
//                     console.log("Document written with ID: ", docRef.id);
//                 })
//                 .catch(function(error) {
//                     console.error("Error adding document: ", error);
//                 });
//         })
//     });
//
//
//
// }