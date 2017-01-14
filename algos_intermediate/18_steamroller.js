/* jshint esversion:6 */
/* globals console */

/* Flatten a nested array. You must account for varying levels of nesting.

   Using iterative solution.  How it works: it loops over tht input array,
   shifting elements to the output array if they saisfy a specific condition:
   if they are not themselves arrays.  If the shifted element IS an array,
   input 'arr' is set to the current el with the remaining 'arr' (from the 
   shift) concatenated onto its back.
   
   1. Init empty output array. This will contain the elements after flattening
   2. var 'iteration' is just used in console for readability
   3. the 'while' loop iterates as long as the input array has length
   4. shift() the 1st element 'elem' off.
   5. if 'elem' is itself an array, re-assign 'arr' = 'elem' plus the 
      leftovers from shifting 'elem' off the front.
   6. if 'elem' is not an array itself, push it to 'output'
   7. eventually, 'arr' will have zero length and all deep elements will
      have been pushed to 'output'
   8. Return 'output'
 */

function steamrollArray(arr) {
    
    var output = [],
        iteration = 1;
    
    // iterate as long as arr has length
    while (arr.length > 0) {
        
        console.log('--------- Loop ' + iteration + ' ---------');
        console.log('     Input: ', arr);
        
        // capture 1st element of innput array
        var elem = arr.shift();
        console.log('  Shifting: ', elem);
        console.log(' Leftovers: ', arr);
        
        if (Array.isArray(elem)) {
            // elem = array, reassign arr, adding 
            arr = elem.concat(arr);
        } else {
            // elem != array, push elem to output
            output.push(elem);
        }
        
        console.log(' New array: ', arr);
        console.log('Output arr: ', output);
        
        // increment iteration - only used for console output
        iteration += 1;
        
    }
    
    return output;
    
}

// tests
console.log(
    steamrollArray([[["a"]], [["b"]]])
    // should return ["a", "b"]
);
console.log(
    steamrollArray([1, [2], [3, [[4]]]])
    // should return [1, 2, 3, 4].
);
console.log(
    steamrollArray([1, [], [3, [[4]]]])
    // should return [1, 3, 4].
);
console.log(
    steamrollArray([1, {}, [3, [[4]]]])
    // should return [1, {}, 3, 4]
);