/* jshint esversion:6 */
/* globals console */

/* Convert the given number into a roman numeral.
   All roman numerals answers should be provided in upper-case.
   
   [[1000, 'M'], [500,  'D'], [100,  'C'],
    [50,   'L'], [10,   'X'], [5,    'V'],
    [1,    'I']],
   
*/

// I don't think this can be done programmattically ...
// This the Roman number matrix must be hardcoded. 

function convertToRoman(num) {

    var matrix = [
        ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
    ];
        
    return matrix;
    
}


console.log(
    convertToRoman(35)
);