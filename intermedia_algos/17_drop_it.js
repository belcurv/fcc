/* jshint esversion:6 */
/* globals console */

/* Drop the elements of an array (first argument), starting from the front,
   until the predicate (second argument) returns true.

   The second argument, func, is a function you'll use to test the first
   elements of the array to decide if you should drop it or not.
   
   Return the rest of the array, otherwise return an empty array.
*/

function dropElements(arr, func) {
    // create array of true/false evaluations for each
    // 'arr' element passed through 'func' argument
    var boolArrMap = arr.map(function (el) {
  	    return func(el);
    });
  
    // return conditionally... 
    if (boolArrMap.indexOf(true) === -1) {
        // if 'boolArrMap' contains zero 'true', return empty []
        return [];
    } else {
        // otherwise, return sliced subset of the input array,
        // where the slice is at the first index of 'true'
        return arr.slice(boolArrMap.indexOf(true));
    }
}

/* ES6 version

    function dropElements(arr, func) {
        var boolMap = arr.map( (el) => func(el) );
    
        return (boolMap.indexOf(true) === -1) ? [] : arr.slice(boolMap.indexOf(true));
    }
    
*/

/* Recursive version

   function dropElements(arr, func) {
   
	    // if either the array is empty, or the function returns true,
       // we're done - return the array
	    if (arr.length === 0 || func(arr[0])) {
           return arr;
           
       } else {
  	        // remove first element
  	        arr.shift();
           // and feed resulting array back into 'dropElements()'
           return dropElements(arr, func);
       }
   }

*/

console.log(
    dropElements([1, 2, 3], function(n) {return n < 3; })
);
