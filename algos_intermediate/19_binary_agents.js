/* jshint esversion:6 */
/* globals console */

/* Return an English translated sentence of the passed binary string.
   The binary string will be space separated.
   
   Solution
   1. split the input string into an array of strings,
   2. .map() the array:
      * parse binary string into its base-10 integer equivalent,
      * then return the unicode character represented by the integer,
   3. finally, return the output array joined by 0-space ''.
*/

function binaryAgent(str) {
    
    var charArr = str.split(' ');  // input string -> array of strings
    
    return charArr
    
        .map(function (char) {
            char = parseInt(char, 2);         // binary  -> integer
            return String.fromCharCode(char); // integer -> unicode
        })
    
        .join('');                            // array   -> string
}

// tests
console.log(
    binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111")
    // should return "Aren't bonfires fun!?"
);

console.log(
    binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001")
    // should return "I love FreeCodeCamp!" 
);