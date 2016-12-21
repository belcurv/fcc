/*
 * Quotes on Design API
 * Endpoint: http://quotesondesign.com/wp-json/posts
 *
 * example usage
 * http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1
 *
 */

(function () {

    'use strict';

    angular

        .module('quoteApp', [])

        .factory('Quotes', ['$http', function ($http) {

            /* HTTP Get method
             *
             * @params    [none]
             * @returns   [object]   [fully formed $http GET request]
             */
            function get() {

                var quoteApi = {
                    url   : 'https://quotesondesign.com/wp-json/posts',
                    params: {
                        'filter[orderby]'       : 'rand',
                        'filter[posts_per_page]': 1,

                        // Date querystring so each request is unique.
                        // this hack disables browser caching of results.
                        'processdate': (new Date()).getTime()
                    }
                };

                return $http.get(quoteApi.url, {
                    params: quoteApi.params
                });

            }

            /* Clean quote response strings
             *
             * @params   [string]   str   [input string containing special characters]
             * @returns  [string]         [cleansed string]
             */
            function clean(str) {
                var pTagRex = /(<([^>]+)>)|(&lt;([^>]+)&gt;)/ig,

                    // temporary element never actually added to DOM.
                    // used to decode 'special html entities'
                    text = document.createElement("textarea");

                // set element = html quote string
                text.innerHTML = str;

                // .value converts 'special entities' to regular text.
                // .replace removes the <p> tags
                return text.value.replace(pTagRex, '');

            }

            return {
                get   : get,
                clean : clean
            };
        
        }])

        .controller('quoteController', ['Quotes', '$window', function (Quotes, $window) {

            var vm = this;

            vm.results    = {};
            vm.getQuote   = getQuote;
            vm.tweetQuote = tweetQuote;

            /* COLOR RANDOMIZER
             *
             * @params [none]
             * @returns [string] [rgba color string]
             */
            function genFillColor() {
                var r = Math.floor(Math.random() * 256),
                    g = Math.floor(Math.random() * 256),
                    b = Math.floor(Math.random() * 256),
                    a = Math.floor(Math.random() * 100) / 100;

                return 'rgba(' + [r, g, b, a].join() + ')';
            }

            function getQuote() {
                Quotes.get()
                    .then(function (result) {

                        var quote = result.data[0],
                            body  = angular.element(document)
                                .find('body')
                                .css('background-color', genFillColor());

                        vm.results.author = '- ' + Quotes.clean(quote.title);
                        vm.results.quote  = Quotes.clean(quote.content);

                    }, function (result) {
                        console.log(result.status, result.statusText);
                    });
            }
            vm.getQuote();

            function tweetQuote(quote, author) {

                var twitterUrl  = 'https://twitter.com/home?status=',
                    totalLength = quote.length + author.length + 5;

                if (totalLength > 140) {
                    // shrink quote to accomodate author @ <= 140 characters
                    quote = quote.slice(0, (140 - 5 - author.length));
                }

                twitterUrl += encodeURIComponent(quote + '... -' + author);

                $window.open(twitterUrl, '_blank');
            }
        
        }]);

}());