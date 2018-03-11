$(document).ready(function(){

lat = 0;
lon = 0;
temp = 0;

  //Ask for permission to check location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    });
  }

  //Get JSON from the API
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat, function(json){

    //Change background-color based on temperature
    temp = json.main.temp;
    if (temp > 50) {
      $("body").css("background-color","#FF5733");
    }
    else if (temp > 30) {
      $("body").css("background-color","#FFC300");
    }
    else {
      $("body").css("background-color","#A3E4D7");
    }

    //Display data from the API
    $("#icon").html("<img src='" + json.weather[0].icon + "'>");
    $("#fahrenheit").text(json.main.temp + " F");

    $("#desc").text(json.weather[0].description);
    $("#wind").text("SW " + json.wind.speed + " knots");

    //Change fahrenheit to celsius on click
    $("#fahrenheit").click(function(){
      $(this).text(function(){
        return ((json.main.temp-32) * (5/9)).toFixed(2) + " °C";
      });
    });
  });
});
