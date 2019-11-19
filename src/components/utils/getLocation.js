 export const get_location =()=> {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             var pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };
             console.log(pos);
             return pos;
         });
     } else {
         // Browser doesn't support Geolocation
         console.log("error: Browser doesn't support Geolocation");

     }
 }