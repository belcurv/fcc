/* jshint esversion:6 */
/* globals console */

/* Flatten a nested array. You must account for varying levels of nesting.

Array.isArray() determines whether the passed value is an Array.

Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false
Array.isArray("foobar");   // false
Array.isArray(undefined);  // false

 */

function reducer(el) {
    
    // if it's not an array, just return it
    if (!Array.isArray(el)) {
        return el;
    }
        
}

function isArray(elem) {
    return (Array.isArray(elem) ? true : false);
}

function steamrollArray(arr) {
    
    var output = [],
        ind = 1;
    
    while (arr.length) {
        console.log(ind);
        
        var elem = arr.shift();
        
        if (isArray(elem)) {
            arr = elem.concat(arr);
        } else {
            output.push(elem);
        }
        
        ind++;
        
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