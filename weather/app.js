(function () {

    'use strict';

    angular.module('weatherApp', [])

        .factory('weatherFac', ['$q', '$http', '$window', function ($q, $http, $window) {

            /* Get user location
             * Async operation requires promise ($q)
             *
             * @params                [none]
             * @returns   [object]    [coordinates obj or error]
             */
            function getCurrentPosition() {
                var deferred = $q.defer();

                if (!$window.navigator.geolocation) {

                    // fallback to IP based location
                    $http.get('http://ipinfo.io')
                        .then(function (response) {

                            // Response lat/long comes as single sting.
                            // getWeather() expects a serparate lat & long.
                            // First step: convert to an array
                            var coords = response.data.loc.split(',');

                            // then 'return' as a lat/long object
                            deferred.resolve({
                                latitude : coords[0],
                                longitude: coords[1]
                            });
                        });

                } else {
                    
                    // html5 browser geolocation
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
                var fullUrl = [
                    'http://forecast.weather.gov/MapClick.php',
                    '?lat=', coords.latitude,
                    '&lon=', coords.longitude,
                    '&FcstType=json'
                ].join('');

                return $http.get(fullUrl)
                    .then(
                        function (response) {
                            // success
                            return response.data.currentobservation;
                        },
                        function (response) {
                            // error
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
                units   = 'F';

            // init view object; to be filled by updateView()
            vm.weather = {};


            // random NOAA background image
            vm.background = [
                'http://www.photolib.noaa.gov/bigs/libr0',
                Math.floor((Math.random() * 100) + 300),
                '.jpg'
            ].join('');


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

            
            /* Handle "change units" button
             *
             * @params   [number]   temp    [temperature]
             * @params   [string]   units   [degree symbol & unit letter]
            */
            vm.changeUnits = function (temp, units) {

                // units.length = 3 : the deg symbol + unit letter
                if (units[2] === 'F') {
                    vm.weather.Temp  = ((temp - 32) * 5 / 9).toFixed(0);
                    vm.weather.units = degSign + ' C';
                } else {
                    vm.weather.Temp  = ((temp * 9 / 5) + 32).toFixed(0);
                    vm.weather.units = degSign + ' F';
                }
            };
        
        }]);

}());