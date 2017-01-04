/* jshint esversion:6 */
/* globals console */

/* Solution uses a 2D array of Roman numerals, where each sub-array is a
   "place" in decimal notation (1's place, 10's place, etc.).
   
   The input number is converted into an array of it's base10 constituent
   numbers (ex. '123' becomes [1, 2, 3]).
   
   That input number array is then reversed ([1, 2, 3] becomes [3, 2, 1]).
   
   Then loop over that array, using the number's index to key to the
   correct Roman numeral sub-array, and 'p' to key to the element within
   the sub-array.
   
   The lookup will find either a '' or a Roman numeral string, and then
   add it to the output string.

*/
function convertToRoman(num) {

    var numerals = [
        ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1's
        ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10's\
        ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100's
        ['', 'M', 'MM', 'MMM', 'MMMM', 'MMMMM', 'MMMMMM', 'MMMMMMM', 'MMMMMMMM']
    ],
        numbArr = num.toString(10).split('').reverse(),
        output = '';
    
    // console.log('Reversed number array: ' + numbArr);
    
    numbArr.forEach(function (p, index) {
        output = numerals[index][p] + output;
    });
    
    return output;
}

// test it!
console.log(
    convertToRoman(2),    // should return "II".
    convertToRoman(3),    // should return "III".
    convertToRoman(4),    // should return "IV".
    convertToRoman(5),    // should return "V".
    convertToRoman(9),    // should return "IX".
    convertToRoman(12),   // should return "XII".
    convertToRoman(16),   // should return "XVI".
    convertToRoman(29),   // should return "XXIX".
    convertToRoman(44),   // should return "XLIV".
    convertToRoman(45),   // should return "XLV"
    convertToRoman(68),   // should return "LXVIII"
    convertToRoman(83),   // should return "LXXXIII"
    convertToRoman(97),   // should return "XCVII"
    convertToRoman(99),   // should return "XCIX"
    convertToRoman(500),  // should return "D"
    convertToRoman(501),  // should return "DI"
    convertToRoman(649),  // should return "DCXLIX"
    convertToRoman(798),  // should return "DCCXCVIII"
    convertToRoman(891),  // should return "DCCCXCI"
    convertToRoman(1000), // should return "M"
    convertToRoman(1004), // should return "MIV"
    convertToRoman(1006), // should return "MVI"
    convertToRoman(1023), // should return "MXXIII"
    convertToRoman(2014), // should return "MMXIV"
    convertToRoman(3999)  // should return "MMMCMXCIX" 
);