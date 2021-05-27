// 'use strict'

// function fetchTheWeather() {
//     fetch(
//         "http://api.openweathermap.org/data/2.5/weather?q=Montgomery&appid=3c2facbbe498e0468ed6e5b436dcc588")
//         .then(function (response) {
//         return response.json();
//     });
// }



  <script>
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=houston&appid=3c2facbbe498e0468ed6e5b436dcc588")
        .then(response => response.json())
        .then(body => {
          document.getElementById("weather").innerHTML = body.main.temp + "°";
        })
        .catch(error => alert("Please add your api key to the fetch url"));
    </script>




