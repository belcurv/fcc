/* jshint esversion:6 */
/* globals console */

/* Find the smallest common multiple of the provided parameters that can
   be evenly divided by both, AS WELL AS BY ALL SEQUENTIAL NUMBERS IN THE
   RANGE between these parameters.
   
   The range will be an array of two numbers that will not necessarily be
   in numerical order.
   
   e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3
   that is evenly divisible by all numbers between 1 and 3.
   
   Euclid's Algorithm:
   https://www.youtube.com/watch?v=bUz2Fe9L4Xs
   
   // WAIT - prime factorization?!  Yes.-  see ver 2
      EDIT - no!  prime factorization is too complicated...
      Do this with Euclid's Algo, GCD > LCM
      This is possible because
         LCM(a, b, c)
         is the same as
         LCM( LCM(a, b), c )
      Perfect application for .reduce()
*/


// find greatest common divisor via Euclid's algorithm
// based on the remainder after dividing 'b' into 'a',
// and then recusively passing the remainder back into the CGD
// function.
function GCD(a, b) {

    // when the remainder is 0, we're done: return LAST divisor
    if (b === 0) {
        return a;
    } else {
        // return 'b' and the remainder of 'a'/'b'
        return GCD(b, a % b);
    }
}


// find lowest common multiple of two integers
// using Euclid's method of finding GCD
function LCM(a, b) {
    return (a * b) / GCD(a, b);
}


// find the LCM of any number of integers
function smallestCommons(arr) {

    // sort input array ascending
    // arr = arr.sort(function (a, b) { return a - b } );  // es5
    arr = arr.sort((a, b) => a - b);                       // es6

    // expand input array to continuous series
    var series = [],
        i;

    for (i = arr[0]; i <= arr[1]; i += 1) {
        series.push(i);
    }

    // seeing is believing
    console.log('Input series: ' + series);

    ///////////////////////////////////////////////////////////////
    //                       do the thing !                      //
    ///////////////////////////////////////////////////////////////
    return series.reduce((a, b) => LCM(a, b));    // es6

    // return series.reduce(function (a, b) {     // es5
    //    return LCM(a, b);
    // });
}

// tests
console.log(
    smallestCommons([1, 5])   // should return 60
);
console.log(
    smallestCommons([5, 1])   // should return 60  
);
console.log(
    smallestCommons([1, 13])  // should return 360360.
);
console.log(
    smallestCommons([23, 18]) // should return 6056820
);