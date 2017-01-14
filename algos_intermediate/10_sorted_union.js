/* jshint esversion:6 */
/* globals console */

/* takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.
*/

function uniteUnique(arr) {
    
    var argsArr = [],
        flatArr = [],
        outputArr = [],
        i;
    
    // capture all input arrays from arguments object
    for (i = 0; i < arguments.length; i += 1) {
        argsArr.push(arguments[i]);
    }
    
    ///////////// SHINY, NEW METHOD
    return argsArr
        
        // "flatten" the array of argument arrays
        // the tail '[]' is to give .reduce() a starting value
        .reduce( (a, b) => a.concat(b), [] )
        
        // filter the flattened array for uniques
        .filter(function (el, ind, self) {
            // compare indexOf(el) with ind.
            // indexOf(el) will find the 1st index in the array.
            // 'ind' will be whatever the current index is.
            // If indexOf(el) != ind, it must be a duplicate.
            return self.indexOf(el) === ind;
        });
    
    ////////////// OLD, BRUTE FORCE METHOD
    // "flatten" the array of argument arrays
    // the tail '[]' is to give .reduce() a starting value
    //
    // flatArr = argsArr.reduce( (a, b) => a.concat(b), [] );
    // 
    // // push unique elements to output array
    // flatArr.forEach(function (el) {
    //     if (outputArr.indexOf(el) === -1) {
    //         outputArr.push(el);
    //     }
    // });
    // 
    // 
}

console.log(
    uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])
);