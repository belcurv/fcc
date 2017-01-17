/* jshint esversion:6 */
/* globals angular, console, document */

(function () {
    'use strict';
    
    angular
        .module('calcApp', [])
    
        .factory('calcFactory', [function () {
            
            var regA,
                regB,
                screen;
            
            
            function onClickClear() {
                console.log('Clear clicked!');
            }
            
            function onClickNum(num) {
                console.log('Number ' + num + ' clicked!');
            }
            
            function onClickDiv() {
                console.log('Divide clicked!');
            }
            
            function onClickMult() {
                console.log('Multiply clicked!');
            }
            
            function onClickMinus() {
                console.log('Minus clicked!');
            }
            
            function onClickDecimal() {
                console.log('Decimal clicked!');
            }
            
            function onClickEval() {
                console.log('Equals clicked!');
            }
            
            function onClickPlus() {
                console.log('Plus clicked!');
            }
            
            return {
                onClickClear: onClickClear,
                onClickNum: onClickNum,
                onClickDiv: onClickDiv,
                onClickMult: onClickMult,
                onClickMinus: onClickMinus,
                onClickDecimal: onClickDecimal,
                onClickEval: onClickEval,
                onClickPlus: onClickPlus
            };
            
        }])
    
        .controller('calcController', [function () {
            
        }])
    
        .directive('calculator', ['calcFactory', function (calcFactory) {
        
            var template = [
                '<div class="calc-body">',
                  '<div class="calc-display">{{ vm.display }}</div>',
                  
                  '<div ng-click="vm.onClickClear()" class="btn-clear"> C </div>',
                  
                  '<div id="buttons" class="btn-container">',
                    '<div ng-click="vm.onClickNum(7)" class="btn calc-numbers"> 7 </div>',
                    '<div ng-click="vm.onClickNum(8)" class="btn calc-numbers"> 8 </div>',
                    '<div ng-click="vm.onClickNum(9)" class="btn calc-numbers"> 9 </div>',
                    '<div ng-click="vm.onClickDiv()"  class="btn calc-functions"> &divide; </div>',
                    '<div ng-click="vm.onClickNum(4)" class="btn calc-numbers"> 4 </div>',
                    '<div ng-click="vm.onClickNum(5)" class="btn calc-numbers"> 5 </div>',
                    '<div ng-click="vm.onClickNum(6)" class="btn calc-numbers"> 6 </div>',
                    '<div ng-click="vm.onClickMult()" class="btn calc-functions"> x </div>',
                    '<div ng-click="vm.onClickNum(1)" class="btn calc-numbers"> 1 </div>',
                    '<div ng-click="vm.onClickNum(2)" class="btn calc-numbers"> 2 </div>',
                    '<div ng-click="vm.onClickNum(3)" class="btn calc-numbers"> 3 </div>',
                    '<div ng-click="vm.onClickMinus()" class="btn calc-functions"> - </div>',
                    '<div ng-click="vm.onClickDecimal()" class="btn calc-numbers"> . </div>',
                    '<div ng-click="vm.onClickNum(0)" class="btn calc-numbers"> 0 </div>',
                    '<div ng-click="vm.onClickEval()" class="btn calc-functions"> = </div>',
                    '<div ng-click="vm.onClickPlus()" class="btn calc-functions"> + </div>',
                  '</div>',
                
                '</div>'
            ].join('');
            
            var calcController = function () {
                
                var vm = this;
                
                vm.onClickClear   = calcFactory.onClickClear;
                vm.onClickNum     = calcFactory.onClickNum;
                vm.onClickDiv     = calcFactory.onClickDiv;
                vm.onClickMult    = calcFactory.onClickMult;
                vm.onClickMinus   = calcFactory.onClickMinus;
                vm.onClickDecimal = calcFactory.onClickDecimal;
                vm.onClickEval    = calcFactory.onClickEval;
                vm.onClickPlus    = calcFactory.onClickPlus;
                
                vm.display = '0';
                
            };
        
            return {
                replace: true,
                restrict: 'EA',
                controller: calcController,
                controllerAs: 'vm',
                template: template
            };

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