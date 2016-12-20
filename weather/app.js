(function () {

    'use strict';
    
    angular.module('weatherApp', [])
    
        .factory('weatherFac', ['$q', '$http', '$window', function ($q, $http, $window) {
            
            
            /* Get user location w/geolocation
             * Async operation requires promise ($q)
             *
             * @params                  [none]
             * @returns   [object]      [coordinates obj or error]
             */
            function getCurrentPosition() {
                var deferred = $q.defer();
                
                if (!$window.navigator.geolocation) {
                    deferred.reject('Browser does not support geolocation');
                } else {
                    $window.navigator.geolocation.getCurrentPosition(
                        function (pos) {
                            deferred.resolve(pos.coords);
                        },
                        function (err) {
                            deferred.reject(err);
                        }
                    );
                }
                
                return deferred.promise;
            }
            
            
            /* Get local weather
             * $http GET method returns a promise
             *
             * @params   [object]   coords   [coordinates object]
             * @returns  [object]            [weather results]
             */
            function getWeather(coords) {
                var lat     = coords.latitude,
                    long    = coords.longitude,
                    baseUrl = "http://forecast.weather.gov/MapClick.php",
                    fullUrl = baseUrl + "?lat=" + lat + "&lon=" + long + "&FcstType=json";

                return $http.get(fullUrl)
                    .then(
                        function (response) {
                            console.log('Status: ' + response.status);
                            console.log('Data', response.data);
                            return response.data.currentobservation;
                        },
                        function (response) {
                            console.log('Status: ' + response.status);
                        }
                    );
            }
            
            
            // export the methods
            return {
                getCurrentPosition: getCurrentPosition,
                getWeather: getWeather
            };
            
        }])
    
        .controller('weatherController', ['weatherFac', function (weatherFac) {
            
            var vm = this,
                degSign = String.fromCharCode(parseInt('00B0', 16)),
                units = 'F';
            
            
            // init view object; to be filled by updateView()
            vm.weather = {};
                        

            // IIEF to kick it all off
            (function getUserLocation() {
                weatherFac.getCurrentPosition()
                    .then(weatherFac.getWeather)
                    .then(function (weather) {
                        // bind weather object to view model
                        vm.weather = weather;
                        vm.weather.units = degSign + ' ' + units;
                    });
            }());
            

            // handle "change units" button event clicks
            // just gets DOM value, manipulates it, and sticks it back into the DOM
            vm.changeUnits = function (temp, units) {
                
                // units is a string of length = 3, consisting of the
                // deg symbol + unit letter. We target 3rd position:
                if (units[2] === 'F') {
                    vm.weather.Temp = ((temp - 32) * 5 / 9).toFixed(0);
                    vm.weather.units = degSign + ' C';
                } else {
                    vm.weather.Temp = ((temp * 9 / 5) + 32).toFixed(0);
                    vm.weather.units = degSign + ' F';
                }
            };

        }]);

}());