/* jshint esversion:6 */
/* globals console */

/* Re: the RegEx .test() method - it returns a boolean.
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
*/

/* Check and Preserve letter casing
 * @params   [string]   before   [the origin word to be replaced]
 * @params   [string]   after    [the replacement word]
 * @returns  [string]            [replacement word with correct casing]
 */
function checkCaps(before, after) {
    var regex = /[A-Z]/g;

    if (regex.test(before.charAt(0))) {
        after = after.charAt(0).toUpperCase() + after.slice(1);
    }

    return after;
}


/* Replace String
 * @params   [string]   str      [phrase to check]
 * @params   [string]   before   [word targeted for replacement]
 * @params   [string]   after    [replacement word]
 * @returns  [string]            [new phrase w/replacement word]
 */
function myReplace(str, before, after) {
    var inputArr = str.split(' ');

    return inputArr
        .map(function (elem, ind) {
            return (elem === before) ? checkCaps(before, after) : elem;
        })
        .join(' ');

    //    return inputArr
    //        .map((elem, ind) => (elem === before) ? checkCaps(before, after) : elem)
    //        .join(' ');

}

// tests
console.log(
    myReplace('A quick brown fox jumped over the lazy dog', 'jumped', 'leaped')
);