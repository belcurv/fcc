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
                  '<div id="display" class="calc-display></div>',
                  
                  '<div id="btn-clear" data-value="c" class="btn-clear"> C </div>',
                  
                  '<div id="buttons" class="btn-container">',
                    '<div data-value="7" class="btn calc-numbers"> 7 </div>',
                    '<div data-value="8" class="btn calc-numbers"> 8 </div>',
                    '<div data-value="9" class="btn calc-numbers"> 9 </div>',
                    '<div data-value="/" class="btn calc-functions"> &divide; </div>',
                    '<div data-value="4" class="btn calc-numbers"> 4 </div>',
                    '<div data-value="5" class="btn calc-numbers"> 5 </div>',
                    '<div data-value="6" class="btn calc-numbers"> 6 </div>',
                    '<div data-value="*" class="btn calc-functions"> x </div>',
                    '<div data-value="1" class="btn calc-numbers"> 1 </div>',
                    '<div data-value="2" class="btn calc-numbers"> 2 </div>',
                    '<div data-value="3" class="btn calc-numbers"> 3 </div>',
                    '<div data-value="-" class="btn calc-functions"> - </div>',
                    '<div data-value="." class="btn calc-numbers"> . </div>',
                    '<div data-value="0" class="btn calc-numbers"> 0 </div>',
                    '<div data-value="=" class="btn calc-functions"> = </div>',
                    '<div data-value="+" class="btn calc-functions"> + </div>',
                  '</div>',
                
                '</div>'
            ].join('');
        
            function link(scope, elem, attrs) {
                
                // init variables
                var regA = null,
                    regB = null,
                    opr,
                    screen = '0';
                    
                
                // cache DOM elements
                var display = angular.element(document.getElementById('display')),
                    btnClear = angular.element(document.getElementById('btn-clear')),
                    btnContainer = angular.element(document.getElementById('buttons'));
                
                
                // bind events
                btnContainer.on('click', clickHandler);
                btnClear.on('click', clear);
                
                
                // handle clicks to main button group
                function clickHandler(evt) {
                    
                    // ignore clicks on parent element
                    if (evt.target !== evt.currentTarget) {
                                                
                        var btnValue = evt.target.dataset.value;
                                                
                        if (/[0-9]/.test(btnValue)) {
                            handleNumbers(btnValue);
                        } else {
                            handleMath(btnValue);
                        }
                        
                        render(btnValue);
                    }
                    
                    evt.stopPropagation();
                }
                
                
                // handle clicks to 'clear' button
                function clear(evt) {
                    regA = 0;
                    regB = 0;
                    screen = '0';
                    
                    render();
                    
                    evt.stopPropagation();
                }

                
                function render(value) {
                    
                    console.log(regA);
                    
                    if (regA) {
                        screen = regA.toString();
                    } else {
                        screen = '0';
                    }
                    
                    display.html(screen);
                }
                
                
                function handleNumbers(value) {
                    
                    console.log(typeof value);
                    
                    // store vals in registers
                    regA += value;
                    console.log('Number! ' + value);
                }
                
                
                function handleMath(operator) {
                    
                    // operate on values in registers
                    // when operator is clicked, send screen values to
                    // register A or B
                    console.log('Operator! ' + operator);
                }
                
                render();
                
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