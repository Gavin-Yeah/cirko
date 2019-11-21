const get_location =(callback)=> {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             var pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };

             callback(pos);
             return pos;
         });
     } else {
         // Browser doesn't support Geolocation
         console.log("error: Browser doesn't support Geolocation");

     }
 }

 /* pass the location and the result is the formatted address */
// const geocodeLatLng =(location, callback) =>{
//      var geocoder = new google.maps.Geocoder;
//      var latlng = {lat: location.lat, lng: location.lng};
//      geocoder.geocode({'location': latlng}, function(results, status) {
//          if (status === 'OK') {
//              if (results[0]) {
//                  callback(results[0].formatted_address);
//              } else {
//                  window.alert('No results found');
//              }
//          } else {
//              window.alert('Geocoder failed due to: ' + status);
//          }
//      });
//  }

 /* the result will be the list of posts which meet the requirement */
// const fliter =(list_posts, distance, user_location, callback)=>{
//      let mydestinations = [];
//      console.log(list_posts);
//      for(let i = 0; i<list_posts.length; i++) {
//          mydestinations.push(new google.maps.LatLng(list_posts[i].location.lat, list_posts[i].location.lng));
//      }
//      let ori = new google.maps.LatLng(user_location.lat, user_location.lng);
//      var service = new google.maps.DistanceMatrixService();
//      let return_list = [];
//      service.getDistanceMatrix(
//          {
//              origins: [ori],
//              destinations: mydestinations,
//              travelMode: 'WALKING'
//          }, (response, status)=>{return_list = fliter_help(response, status, distance, list_posts)
//              callback(return_list);
//          });
//  }

// const fliter_help =(response, status, dis, list_posts) =>{
//      let distances = [];
//      let return_list = [];
//      if (status == 'OK') {
//          var origins = response.originAddresses;
//
//          for (var i = 0; i < origins.length; i++) {
//              var results = response.rows[i].elements;
//              for (var j = 0; j < results.length; j++) {
//                  var element = results[j];
//                  var distance = element.distance.value;
//                  distances.push(distance);
//              }
//          }
//          for(let i = 0; i < distances.length; i++) {
//              if(distances[i] < dis) {
//                  return_list.push(list_posts[i]);
//              }
//          }
//          return return_list;
//      }
//      return return_list;
//  }
export {get_location}