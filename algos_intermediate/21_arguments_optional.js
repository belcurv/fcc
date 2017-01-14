/* jshint esversion:6 */
/* globals console */

/* Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = addTogether(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.

*/

function addTogether() {
    
    // init vars
    var args = [],
        i;
    
    // push arg to array if it's is a number
    for (i = 0; i < arguments.length; i += 1) {
        if (typeof arguments[i] === 'number') {
            args.push(arguments[i]);
        } else {
            return undefined;
        }
    }

    // if less then 2 args, return a function, otherwise add args
    if (args.length < 2) {
        return (b) => (typeof b === 'number') ? (args[0] + b) : undefined;
    } else {
        return args.reduce( (a, b) => a + b );
    }
}

// tests
console.log(
    addTogether(2,3)         // should return 5.
);
console.log(
    addTogether(2)(3)        // should return 5
);
console.log(
    addTogether("http://bit.ly/IqT6zt")    // should return undefined.
);
console.log(
    addTogether(2, "3")      // should return undefined.
);
console.log(
    addTogether(2)([3])      // should return undefined.
);