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
                                latitude: coords[0],
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
                units = 'F',
                iconMap = {
                    "skc.png": "wi-owm-800",
                    "nskc.png": "wi-owm-night-800",
                    "few.png": "wi-owm-day-804",
                    "nfew.png": "wi-owm-night-804",
                    "sct.png": "wi-owm-day-804",
                    "nsct.png": "wi-owm-night-804",
                    "bkn.png": "wi-owm-day-804",
                    "nbkn.png": "wi-owm-night-804",
                    "ovc.png": "wi-owm-804",
                    "novc.png": "wi-owm-804",
                    "sn.png": "wi-owm-day-600",
                    "nsn.png": "wi-owm-600",
                    "ra_sn.png": "wi-owm-day-611",
                    "nra_sn.png": "wi-owm-611",
                    "raip.png": "wi-owm-day-611",
                    "nraip.png": "wi-owm-611",
                    "fzra.png": "wi-owm-day-611",
                    "nfzra.png": "wi-owm-611",
                    "ra_fzra.png": "wi-owm-day-611",
                    "nra_fzra.png": "wi-owm-611",
                    "fzra_sn.png": "wi-owm-day-611",
                    "nfzra_sn.png": "wi-owm-611",
                    "ip.png": "wi-owm-day-906",
                    "nip.png": "wi-owm-906",
                    "snip.png": "wi-owm-day-611",
                    "nsnip.png": "wi-owm-611",
                    "minus_ra.png": "wi-owm-day-300",
                    "nra.png": "wi-owm-300",
                    "ra.png": "wi-owm-day-302",
                    "shra.png": "wi-owm-day-300",
                    "nshra.png": "wi-owm-300",
                    "hi_shwrs.png": "wi-owm-day-520",
                    "hi_nshwrs.png": "wi-owm-313",
                    "tsra.png": "wi-owm-day-200",
                    "ntsra.png": "wi-owm-200",
                    "scttsra.png": "wi-owm-day-200",
                    "nscttsra.png": "wi-owm-200",
                    "hi_tsra.png": "wi-owm-day-200",
                    "hi_ntsra.png": "wi-owm-200",
                    "fc.png": "wi-owm-day-900",
                    "nfc.png": "wi-owm-900",
                    "tor.png": "wi-owm-day-900",
                    "ntor.png": "wi-owm-900",
                    "hur_warn.png": "wi-owm-day-902",
                    "hur_watch.png": "wi-owm-day-902",
                    "ts_warn.png": "wi-owm-902",
                    "ts_watch.png": "wi-owm-902",
                    "ts_nowarn.png": "wi-owm-902",
                    "wind_skc.png": "wi-owm-957",
                    "nwind_skc.png": "wi-owm-957",
                    "wind_few.png": "wi-owm-day-801",
                    "nwind_few.png": "wi-owm-801",
                    "wind_sct.png": "wi-owm-day-801",
                    "nwind_sct.png": "wi-owm-801",
                    "wind_bkn.png": "wi-owm-day-801",
                    "nwind_bkn.png": "wi-owm-801",
                    "wind_ovc.png": "wi-owm-801",
                    "nwind_ovc.png": "wi-owm-801",
                    "du.png": "wi-owm-day-761",
                    "ndu.png": "wi-owm-761",
                    "fu.png": "wi-owm-day-711",
                    "nfu.png": "wi-owm-711",
                    "hot.png": "wi-owm-904",
                    "cold.png": "wi-owm-903",
                    "ncold.png": "wi-owm-903",
                    "blizzard.png": "wi-owm-day-600",
                    "nblizzard.png": "wi-owm-600",
                    "fg.png": "wi-owm-day-741",
                    "nfg.png": "wi-owm-741"
                };

            // init view object; to be filled by updateView()
            vm.weather = {};
            
            
            function randomColor() {
                var col = "#000000".replace(/0/g, function () {
                    return (~~(Math.random() * 16)).toString(16);
                });
                
                return col;
            }


            // random background image
            vm.background = randomColor() + ', ' + randomColor();

            // IIEF to kick it all off
            (function getUserLocation() {
                weatherFac.getCurrentPosition()
                    .then(weatherFac.getWeather)
                    .then(function (weather) {
                        // bind weather object to view model
                        vm.weather = weather;
                        vm.weather.units = degSign + ' ' + units;
                        vm.weather.icon  = iconMap[weather.Weatherimage];
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
                    vm.weather.Temp = ((temp - 32) * 5 / 9).toFixed(0);
                    vm.weather.units = degSign + ' C';
                } else {
                    vm.weather.Temp = ((temp * 9 / 5) + 32).toFixed(0);
                    vm.weather.units = degSign + ' F';
                }
            };

        }]);

}());