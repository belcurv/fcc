/*
User Story: I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.

User Story: I can click a button to see a random Wikipedia entry.
*/

/*jslint */
/*global angular*/

(function () {
    
    'use strict';
    
    angular
        
        .module('wikiApp', [])
    
        .factory('wikiFactory', ['$http', '$q', function ($http, $q) {
            
            function get(searchTerm) {
                
                var deferred = $q.defer(),
                    apiDetails = {
                        endpoint: 'https://en.wikipedia.org/w/api.php',
                        params  : {
                            action: 'query',
                            format: 'json',
                            prop: 'pageimages|extracts|info',
                            inprop: 'url',
                            generator: 'search',
                            gsrsearch: searchTerm,
                            gsrlimit: 10,
                            exintro: 1,
                            exlimit: 'max',
                            explaintext: 1,
                            grnnamespace: 0,
                            grnfilterredir: 'nonredirects',
                            origin: '*'
                        }
                    };
                
                $http.get(apiDetails.endpoint, {params: apiDetails.params})
                    .then(function (response) {
                        deferred.resolve(response);
                    });
                
                return deferred.promise;
            }
            
            
            // get random article
            // /w/api.php?action=query&format=json&list=random&rnlimit=5
            function getRandom() {
                
                var apiDetails = {
                        endpoint: 'https://en.wikipedia.org/w/api.php',
                        params  : {
                            action: 'query',
                            format: 'json',
                            prop: 'extracts|pageimages|info',
                            generator: 'random',
                            exintro: 1,
                            explaintext: 1,
                            inprop: 'url',
                            grnnamespace: 0,
                            grnfilterredir: 'nonredirects',
                            grnlimit: 1,
                            origin: '*'
                        }
                    },
                    deferred = $q.defer();
                
                $http.get(apiDetails.endpoint, {params: apiDetails.params})
                    .then(function (response) {
                        deferred.resolve(response);
                    });
                
                return deferred.promise;
            }
            
            
            
            return {
                get: get,
                getRandom: getRandom
            };
            
        }])
    
        .controller('wikiController', ['wikiFactory', function (wikiFactory) {
            
            var vm = this;
            
            vm.searchBox = 'Siberian Husky';
            
            
            function handleResponse(res) {
                var resKeys = Object.keys(res.data.query.pages),
                    resConfigParams   = res.config.params,
                    resDataQueryPages = res.data.query.pages;
                
                if (!resConfigParams.gsrsearch) {
                    vm.searchBox = resDataQueryPages[resKeys[0]].title;
                }
                
                vm.resultsArray = resKeys.map(function (el) {
                    return {
                        title   : resDataQueryPages[el].title,
                        extract : resDataQueryPages[el].extract,
                        url     : resDataQueryPages[el].fullurl
                    };
                });
            }
            
            
            function search(searchTerm) {
                wikiFactory.get(searchTerm)
                    .then(handleResponse);
            }
            

            function random() {
                wikiFactory.getRandom()
                    .then(handleResponse);
            }
                
            
            vm.methods = {
                search: search,
                random: random
            };

        }])
    
        .directive('wikiResult', function () {
            
            return {
                restrict: 'AE',
                scope: {
                    result: '='
                },
                template: [
                    '<div class="result">',
                    '<a href="{{ result.url }}" target="_blank">{{ result.title }}</a>',
                    '<p> {{ result.extract }} </p>',
                    '</div>'
                ].join('')
            };
        })
    
        .directive('wikiFooter', function () {
        
            return {
                restrict: 'AE',
                template: [
                    '<p class="footer-credit">Wikipedia Viewer v0.0.1 : : by ',
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