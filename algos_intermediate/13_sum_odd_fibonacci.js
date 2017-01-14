/* jshint esversion:6 */
/* globals console */

/* Given a positive integer num, return the sum of all odd Fibonacci numbers
   that are less than or equal to num.
   
   The first two numbers in the Fibonacci sequence are 1 and 1. Every
   additional number in the sequence is the sum of the two previous numbers.
   The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.
   
   For example, sumFibs(10) should return 10 because all odd Fibonacci numbers
   less than 10 are 1, 1, 3, and 5.
*/


function generateSeries(iterations) {

    // setup
    var i, c,
        a = 1,
        b = 1,
        results = [1, 1];

    // populate the rest of the array
    for (i = 2; i < iterations; i += 1) {
        c = a + b;
        results.push(c);  // push sum
        a = b;            // shift a to b's val
        b = c;            // shift b to c's val
    }

    return results;
}

function sumFibs(num) {
    
    var fibs = generateSeries(num);
    
    return fibs.reduce(function (acc, val) {
        return (val % 2 !== 0 && val <= num) ? acc += val : acc += 0;
    });
}

// tests
console.log(
    sumFibs(4)
);

console.log(
    sumFibs(1) // should return a number.
);
console.log(
    sumFibs(1000) // should return 1785.
);
console.log(
    sumFibs(4000000) // should return 4613732.
);
console.log(
    sumFibs(4) // should return 5.
);
console.log(
    sumFibs(75024) // should return 60696.
);
console.log(
    sumFibs(75025) // should return 135721
);