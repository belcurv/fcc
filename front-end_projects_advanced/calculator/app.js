/* jshint esversion:6 */
/* globals $, console, document */


(function () {
    
    'use strict';

    var regA,
        regB,
        opr,
        output = '',
        
        // cache DOM elements
        $calculator = $('#calculator'),
        $display    = $calculator.find('.calc-display'),
        $clearBtn   = $calculator.find('.btn-clear'),
        $buttons    = $calculator.find('.btn-container');

    
    // bind main button click events
    $buttons.on('click', function (event) {
        
        var val = event.target.dataset.value;
        
        if (event.target !== event.currentTarget) {

            if (/[0-9]/.test(val)) {
                onClickNum( parseFloat(val) );
            } else if (val === '.') {
                onClickNum(val);
            } else if (val === 'eval') {
                onClickEval();
            } else {
                onClickOper(val);
            }
        }

        event.stopPropagation();

    });
    
    
    // bind clear button click events
    $clearBtn.on('click', function () {
        console.log('Clear!');
        regA = undefined;
        regB = undefined;
        opr = undefined;
        output = '';
        
        logState();
        render();
    });


    // number button click handler
    function onClickNum(num) {

        // convert numbers to strings
        if (typeof num === 'number') {
            num = num.toString();
        }

        if (opr === undefined && regA === undefined) {
            regA = num;
            output += num;
        } else if (opr === undefined && regA) {
            regA += num;
            output += num;
        } else if (regB === undefined) {
            regB = num;
            output += num;
        } else {
            regB += num;
            output += num;
        }
        
        logState();
        render();
    }


    // operator button click handler
    function onClickOper(oper) {
        opr = oper;
        output += oper;
        logState();
        render();
    }

    
    // eval button click handler
    function onClickEval() {

        var registerA = parseFloat(regA),
            registerB = parseFloat(regB),
            decimals;

        switch (opr) {
            case '*':
                output = registerA * registerB;
                break;
            case '/':
                output = registerA / registerB;
                break;
            case '+':
                output = registerA + registerB;
                break;
            case '-':
                output = registerA - registerB;
                break;
        }
        
        // format decimals
        if (countDecimals(output) > 10) {
            output = output.toFixed(10);
        } else {
            output = output.toFixed(countDecimals(output));
        }
        
        logState();
        render();
        
        regA = output;
        regB = undefined;
        opr = undefined;
    }
    
    
    // log the machine state
    function logState() {
        console.log('RegA: ' + regA, '| Opr: ' + opr, '| RegB: ' + regB);
    }
    
    
    // render DOM
    function render() {

        if (output === undefined || output === '') {
            $display.html(0);
        } else {
            $display.html(output);
        }        
    }
    
    
    // count number of decimals in output
    function countDecimals(num) {
        if (Math.floor(num) === num) {
            return 0;
        }
        
        return num.toString().split(".")[1].length || 0;
    }
    

    // render on 1st hit
    render();

}());
