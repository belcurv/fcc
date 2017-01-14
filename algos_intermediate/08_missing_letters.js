/* jshint esversion:6 */
/* globals console */

/* Find the missing letter in the passed letter range and return it.
   If all letters are present in the range, return undefined.
*/

function fearNotLetter(str) {

    var charCodes = [],
        missingCode,
        i;

    // create array of character codes
    charCodes = str
        .split('')
        .map((char) => char.charCodeAt(0));

    // iterate through character codes array
    for (i = 0; i < charCodes.length - 1; i += 1) {

        // check for gaps >1 between codes
        if (charCodes[i + 1] - charCodes[i] > 1) {

            // set missing code
            missingCode = parseInt(charCodes[i], 10) + 1;

            // return string from that character code
            return String.fromCharCode(missingCode);
        }
    }

    // no gaps? return: undefined
    return undefined;

}

console.log(
    fearNotLetter("abce")
    //  should return "d"
);

console.log(
    fearNotLetter("abcdefghjklmno")
    // should return "i"
);
console.log(
    fearNotLetter("bcd")
    // should return undefined
);
console.log(
    fearNotLetter("yz")
    // should return undefined
);