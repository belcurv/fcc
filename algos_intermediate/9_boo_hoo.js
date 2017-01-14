/* jshint esversion:6 */
/* globals console */

/* JavaScript has 5 primitive types: undefined, null, boolean,
   string and number.
   
   Check if a value is classified as a boolean primitive.
   Return true or false.

   Boolean primitives are true and false.
*/

function booWho(bool) {
    
    if (typeof(bool) === 'boolean') {
        console.log(bool + ' is a boolean');
        return true;
    } else {
        return false;
    }
}

console.log(
    booWho(null)
);

console.log(
    booWho(true) // should return true.
);
console.log(
    booWho(false) // should return true.
);
console.log(
    booWho([1, 2, 3]) // should return false.
);
console.log(
    booWho([].slice) // should return false.
);
console.log(
    booWho({ "a": 1 }) // should return false.
);
console.log(
    booWho(1) // should return false.
);
console.log(
    booWho(NaN) // should return false.
);
console.log(
    booWho("a") // should return false.
);
console.log(
    booWho("true") // should return false.
);
console.log(
    booWho("false") // should return false
);