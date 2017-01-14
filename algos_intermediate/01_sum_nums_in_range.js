/* jshint esversion:6 */
/* globals console */

/* Given an array of two numbers,
   return the sum of those two numbers and
   all numbers between them.
   
   sumAll([1, 4]) should return 10.
   sumAll([4, 1]) should return 10.
   sumAll([5, 10]) should return 45.
   sumAll([10, 5]) should return 45.
*/

function sumAll(arr) {
    arr = arr.sort((a, b) => a - b);
    return sumRange(arr);
}

function sumRange(arr) {
    
    // get number of integers in range
    var count = arr[1] - arr[0] + 1;
    
    return Array
        
        // create empty array of length = 'count'
        .apply(null, new Array(count))
        
        // populate with values from input array range
        .map((num, ind) => arr[0] + ind)
        
        // sum all the values in the range
        .reduce(function (accum, curval) {
            return accum + curval;
        });
}

// test it!s
console.log(
    sumAll([10, 5])
);