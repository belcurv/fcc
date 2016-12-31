/*

kudos:
http://stackoverflow.com/questions/11850025/recommended-way-of-getting-data-from-the-server/11850027#11850027

User Story: I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.

UPDATE: Due to a change in conditions on API usage explained here Twitch.tv now requires an API key. Workaround: Use https://wind-bow.gomix.me/twitch-api 

NOTE:
This server accepts GET requests only, to /users/:user, /channels/:channel, and /streams/:stream.

USAGE:
https://wind-bow.gomix.me/twitch-api/users/freecodecamp?api_version=3
https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?api_version=3

*/

/*jslint */
/*global angular */

(function () {
    'use strict';

    angular

        .module('twitchApp', [])

        // Twitch asks for specific GET header
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.get = {
                'Accept': 'application/vnd.twitchtv.3+json'
            };
        }])
    
        // API details used throughout
        .constant('api', {
            endpoint: 'https://wind-bow.gomix.me/twitch-api',
            params: {
                api_version: 3
            }
        })

        // Channels service
        .factory('Channel', ['$http', 'api', function ($http, api) {
            
            var Channel = function (data) {
                angular.extend(this, data);
            };
            
            Channel.get = function (user) {
                var fullRoute = api.endpoint + '/channels/' + user;
                
                return $http.get(fullRoute, api.params)
                    .then(function (response) {
                        return new Channel(response.data);
                    });
            };
            
            return Channel;
        }])
    
        // Streams service
        .factory('Stream', ['$http', 'api', function ($http, api) {
            
            var Stream = function (data) {
                angular.extend(this, data);
            };
            
            Stream.get = function (user) {
                var fullRoute = api.endpoint + '/streams/' + user;
                
                return $http.get(fullRoute, api.params)
                    .then(function (response) {
                        return new Stream(response.data);
                    });
            };
            
            return Stream;
        }])

        // Main controller
        .controller('twitchController', ['$scope', '$interval', 'Channel', 'Stream', function ($scope, $interval, Channel, Stream) {

            // sample data
            var sampleUsers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin', 'comster404'];
            
            // init receptacle
            $scope.allChannels = [];
            
            // get channels and populate allChannels array
            angular.forEach(sampleUsers, function (user) {
                return Channel.get(user)
                    .then(function (channel) {
                        if (channel.error) {
                            $scope.allChannels.push({
                                error: channel.status,
                                display_name: user,
                                status: channel.message,
                                isOnline: false
                            });
                            
                        } else {
                            $scope.allChannels.push(channel);
                            attachStream(channel);
                        }
                        
                    });
            });
            
            // merge Stream response data with Channel response data
            function attachStream(channel) {
                Stream.get(channel.name)
                    .then(function (stream) {
                        channel.isOnline = (stream.stream === null) ? false : true;
                        channel.stream = stream;
                    });
            }
            
            // check & update 'online' status every 30 seconds
            $interval(function () {
                // console.log(new Date().getTime());
                angular.forEach($scope.allChannels, function (channel) {
                    Stream.get(channel.name)
                        .then(function (stream) {
                            var isOnline = (stream.stream === null) ? false : true;
                            // console.log(channel.name + ' is online? ' + isOnline);
                            channel.isOnline = isOnline;
                        });
                });
                
            }, 30000);
            
        }])
    
    
        // Standard footer directive
        .directive('belcurvFooter', function () {
        
            return {
                restrict: 'AE',
                scope: {
                    name: '@',
                    version: '@'
                },
                template: [
                    '<p class="footer-credit">{{ name }} {{ version }} : : by ',
                    '<a href="https://github.com/belcurv" target="_blank">belcurv</a> ',
                    '<a href="https://github.com/belcurv" target="_blank">',
                    '<svg width="20" height="20" class="github-icon" viewBox="0 0 16 16" version="1.1" aria-hidden="true">',
                    '<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"> </path>',
                    '</svg></a></p>',
                    '<br />',
                    '<p class="footer-credit">Source released under the MIT license. Website and documentation licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>.</p>'
                ].join('')
            };

        });


}());