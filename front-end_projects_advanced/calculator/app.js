/* jshint esversion:6 */
/* globals angular, console, document */

(function () {
    'use strict';
    
    angular
        .module('calcApp', [])
    
        .controller('calcController', [function () {
            
            var vm = this;
            
            vm.hello = 'Hello world!';
            
        }])
    
        .directive('calculator', function () {
        
            var template = [
                '<div class="calc-body">',
                  '<div class="calc-display"> 99.234 </div>',
                  
                  '<div class="btn-clear"> C </div>',
                  
                  '<div class="btn-container">',
                    '<div class="btn calc-numbers"> 7 </div>',
                    '<div class="btn calc-numbers"> 8 </div>',
                    '<div class="btn calc-numbers"> 9 </div>',
                    '<div class="btn calc-functions"> &divide; </div>',

                    '<div class="btn calc-numbers"> 4 </div>',
                    '<div class="btn calc-numbers"> 5 </div>',
                    '<div class="btn calc-numbers"> 6 </div>',
                    '<div class="btn calc-functions"> x </div>',

                    '<div class="btn calc-numbers"> 1 </div>',
                    '<div class="btn calc-numbers"> 2 </div>',
                    '<div class="btn calc-numbers"> 3 </div>',
                    '<div class="btn calc-functions"> - </div>',

                    '<div class="btn calc-numbers"> . </div>',
                    '<div class="btn calc-numbers"> 0 </div>',
                    '<div class="btn calc-functions"> = </div>',
                    '<div class="btn calc-functions"> + </div>',
                  '</div>',
                
                '</div>'
            ].join('');
        
            function link(scope, elem, attrs) {
                
                var pOne = angular.element(document.createElement('p'));
                
            }
        
            return {
                replace: true,
                restrict: 'EA',
                scope: {},
                link: link,
                template: template
            };

        })
    
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