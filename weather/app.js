$(document).ready(function() {

  'use strict';

  var units = 'F';

  var fetchLocation = new Promise(function(resolve) {

      // 1. First async task: get location
      navigator.geolocation.getCurrentPosition(function(pos) {
        $('#status').html('Trying to obtain geolocation...');
        setTimeout(function() {
          resolve(pos.coords);
        }, 1000);
        
      }, function(err) {
        console.warn('Error(' + err.code + '): ' + err.message);
      });

    });
  
  fetchLocation
    .then(function(coords) {
    
      $('#status').html('Location found, fetching weather...');

      // 2. 2nd async task: get weather
      return new Promise(function(resolve) {
        var lat = coords.latitude,
            long = coords.longitude,
            baseUrl = "http://forecast.weather.gov/MapClick.php",
            fullUrl = baseUrl + "?lat=" + lat + "&lon=" + long + "&FcstType=json";
        
        setTimeout(function() {
          $.getJSON(fullUrl, function(response) {
            resolve(response.currentobservation);
          });
        }, 1000);
      });
    })
    .then(function(weather) {

      // 3. Finally, update the DOM
      $('#status').html('Local weather:');
      $("#location").html(weather.name);
      $("#date").html(weather.Date);
      $("#temperature").html(weather.Temp + "&deg; " + units);

    })
    .catch(function(err) {

      // 4. handle errors
      console.log(err);
    });

  
  // handle "change units" button event clicks
  // just gets DOM value, manipulates it, and sticks it back into the DOM
  $("#changeUnits").click(function() {
    var tempString = $("#temperature").text(),
        temp = parseFloat(tempString);

    if (units === 'F') {
      temp = ((temp - 32) * 5 / 9).toFixed(0);
      units = 'C';
      $("#temperature").html(temp + "&deg; " + units);
    } else {
      temp = ((temp * 9 / 5) + 32).toFixed(0);
      units = 'F';
      $("#temperature").html(temp + "&deg; " + units);
    }

  });

});