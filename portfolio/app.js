/* jshint esversion:6 */
/* globals angular */

(function () {
    'use strict';

    angular
        .module('svgDemo', [])
    
        .controller('svgDemoCtrl', ['$scope', function ($scope) {
            
            $scope.hello = 'world';
            
            $scope.works = [
                {
                    imageUrl: "http://belcurv.com/portfolio/assets/portfolio-csv_parse.png",
                    title: "CSV Parser",
                    description: "This Angular app reads in a remote CSV file via XHR, parses the file using Papaparse, formats the results, outputs the contents as a table and raw JSON. A HTML5 input/range slider is used to filter the results by specific dates.",
                    githubUrl: "https://github.com/belcurv/csv_parse",
                    demoUrl: "http://belcurv.com/csv_parse/"
                },
                {
                    imageUrl: "http://belcurv.com/portfolio/assets/portfolio_album_app_auth.png",
                    title: "MEAN App with Authentication",
                    description: "An Angular application served by Node and Express that uses JWT for user authentication.  It's a basic CRUD application for maintaining a music collection.",
                    githubUrl: "https://github.com/belcurv"
                },
                {
                    imageUrl: "http://belcurv.com/portfolio/assets/portfolio_fishtank.png",
                    title: "Interactive Fish Tank",
                    description: "This is a simple application that uses the processing.js library to create a dynamic interactive fish tank. The seaweed, bubbles and initial fish size/color/direction are random. Refresh the page to start over with different everything. You can add new randomly-generated fish by clicking anywhere inside the fish tank. bigger things move faster (bigger bubbles rise faster and bigger fish swim faster). When the bubbles reach the top, the start over at the bottom. When any fish reaches the left or right side of the tank, it reverses direction.",
                    githubUrl: "https://github.com/belcurv/fish-tank",
                    demoUrl: "http://belcurv.com/portfolio/assets/fish_tank/fishtank.html"
                },
                {
                    imageUrl: "http://belcurv.com/portfolio/assets/portfolio_album_app_md.png",
                    title: "MEAN App with Angular Material",
                    description: "This is a no-authentication version of the music collection application using Angular Material instead of Bootstrap.",
                    githubUrl: "https://github.com/belcurv/album_app_md"
                },
                {
                    imageUrl: "http://belcurv.com/portfolio/assets/portfolio_dice_roll.png",
                    title: "Interactive Dice Roll Sim",
                    description: "This is a simple application using the processing.js library to simulate rolling two 6-sided dice. It counts and sums the results, tabulates everything, and graphs the cumulative sums. No surprise, the distribution takes the shape of a bell curve if you feed it enough dice rolls.",
                    githubUrl: "https://github.com/belcurv/dice-roll",
                    demoUrl: "http://belcurv.com/portfolio/assets/dice_roll/dice-roll.html"
                },
                {
                    imageUrl: "http://belcurv.com/portfolio/assets/portfolio_basic_ejs.png",
                    title: "Boilerplate static site with EJS templates",
                    description: "This is a simple static site built witn NodeJS and Express on the server, serving EJS templates with Material Design Lite.",
                    githubUrl: "https://github.com/belcurv/basic_ejs"
                }
            ];
            
        }])

        .directive('macbookSvg', [function () {

            var template = [
                '<svg width="70%" viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">',
                 '<g class="Laptop" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(1.000000, 1.000000)" stroke="#8492A5">',
                    '<path d="M594,0 L98,0 C84.50415,0 73,11.0738184 73,24.7901127 L73,351.027995 L619,351.027985 L619,24.7901127 C618.999971,11.0728209 607.537479,0 594,0 Z" id="bezel" stroke-width="2" fill="#FEFEFE"></path>',
                    '<circle id="webcam" stroke-width="2" cx="347" cy="19" r="4"></circle>',
                    '<g id="bottom" transform="translate(0.000000, 351.000000)">',
                    '<path d="M640.812,31.01 L51.288,31.01 C20.641,31.01 0,20.494 0,16.022 L0,2.428 C0,1.084 1.335,0 2.995,0 L689.104,0 C690.766,0 692.103,1.084 692.103,2.428 L692.103,16.557 C692.096,20.092 676.112,31.01 640.812,31.01 Z" id="Shape" stroke-width="2" fill="#FDFDFD"></path>',
                    '<path d="M0.5,14.5 L690.242676,14.5" id="Line" stroke-linecap="square"></path>',
                    '</g>',
                    '<rect id="screen" fill="#FFFFFF" x="95" y="39" width="501.073853" height="292.009"></rect>',
                    '<image xlink:href="" ng-href="{{ imgUrl }}" x="96" y="40" width="499.073853" height="290.009" preserveAspectRatio="xMidYMid slice"></image>',
                    '<path d="M421,352 L421,355.087 C421,357.288 416.666719,357.952714 413.386719,357.952714 L278.815286,357.952714 C275.364286,357.952714 271,357.289 271,355.087 L271,352" id="touchpad" fill="#FFFFFF"></path>',
                    '</g>',
                    '</svg>'].join('');

            return {
                restrict: 'E',
                scope: {
                    imgUrl: '@'
                },
                template: template
            };

          }])

        .directive('ipadSvg', [function () {

            var template = [
                '<svg width="29%" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">',
                '<g class="IPAD" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(20.000000, 55.000000)" stroke="#7E89A3">',
                '<path d="M202.986,317 L12.097,317 C5.462,317 0.083,311.623 0.083,304.99 L0.083,12.093 C0.083,5.46 5.461,0.083 12.097,0.083 L202.986,0.083 C209.622,0.083 215,5.46 215,12.093 L215,304.99 C215,311.623 209.622,317 202.986,317 Z" id="bezel" stroke-width="2" fill="#FDFDFD"></path>',
                '<path d="M202.986,317 L12.097,317 C5.462,317 0.083,311.623 0.083,304.99 L0.083,12.093 C0.083,5.46 5.461,0.083 12.097,0.083 L202.986,0.083 C209.622,0.083 215,5.46 215,12.093 L215,304.99 C215,311.623 209.622,317 202.986,317 Z" id="bezel-2" stroke-width="2" fill="#FDFDFD"></path>',
                '<rect id="screen" fill="#FFFFFF" x="17" y="32" width="181.999" height="252.917"></rect>',
                '<image xlink:href="" ng-href="{{ imgUrl }}" x="18" y="33" width="180" height="250.917" preserveAspectRatio="xMidYMid slice"></image>',
                '<circle id="lock" cx="108.021" cy="300.021" r="8.021"></circle>',
                '<circle id="camera" cx="106.99" cy="16.99" r="2.99"></circle>',
                '</g>',
                '</svg>'].join('');

            return {
                restrict: 'E',
                scope: {
                    imgUrl: '@'
                },
                template: template
            };
        }]);

})();