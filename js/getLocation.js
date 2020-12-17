// (function () {
//     navigator.geolocation.getCurrentPosition(function (position) {
//             getUserAddressBy(position.coords.latitude, position.coords.longitude)
//         },
//         function (error) {
//             console.log("The Locator was denied :(")
//         })

//     function getUserAddressBy(lat, long) {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function (results) {
//             if (this.readyState == 4 && this.status == 200) {
//                 var address = JSON.parse(this.responseText)
        
//                 nextStep(address);
          
//             }
//         };
//           xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?q="+ lat +","+long+"&key=7fd4be117d8c45499762b2c94b1c20e2", true);
//         xhttp.send();
//     }

// })();
// function nextStep(address){
//     console.log(address.results[0].formatted)

//     document.getElementById('location').innerHTML += "<h1>" + address.results[0].formatted + "</h1>"
// }
     