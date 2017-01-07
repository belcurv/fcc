/* jshint esversion:6 */
/* globals console */

/* Convert the given number into a roman numeral.
   All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {

    var rNumerals = [[1000, 'M'], [500,  'D'], [100,  'C'],
                     [50,   'L'], [10,   'X'], [5,    'V'],
                     [1,    'I']],
        matrix = [],
        remainder = num;

    matrix = rNumerals.map(function (elem) {
        
        return {
            number: elem[0],
            numeral: elem[1],
            count: Math.floor(remainder / elem[0]),
            remainder: (num >= elem[0]) ? (remainder -= (elem[0] * Math.floor(remainder / elem[0]))) : 0
        };
    });
    
    // diag
    console.log(matrix);
    
    return matrix
    
        // strip nonapplicable numerals from set
        .filter(function (elem) {
            console.log(elem)
            return elem.count;
        })
    
        // return new arrays containg qty of Rnumerals. The trick here is
        // that `Array()` needs to be 1 more than the number of Rnumerals,
        // because `.join()` fills in between the elements.
        .map(function (elem) {
             return Array(elem.count + 1).join(elem.numeral);
        })
    
        // convert to string, removing commas
        .join('');
}

// tests
console.log(
    convertToRoman(36),  // works
    convertToRoman(4)    // doesn't work
);