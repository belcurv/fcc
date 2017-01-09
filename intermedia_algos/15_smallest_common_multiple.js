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
        // recursive magic!
        // return 'b' and the remainder of 'a'/'b'
        return GCD(b, a % b);
    }
}

// find lowest common multiple of two integers
function LCM(a, b) {
    return (a * b) / GCD(a, b);
}


function smallestCommons(arr) {
    
    // sort input array low to high
    arr = arr.sort( (a, b) => a - b );
    
    var gcd = GCD(arr[0], arr[1]),
        lcm = LCM(arr[0], arr[1]),
        fullSeries = [],
        i;
    
    // generate series
    for (i = arr[0]; i <= arr[0] * arr[1]; i += 1) {
        fullSeries.push(i);
    }
    
    // gonna need us some .map() and/or then .reduce()
    
    console.log(fullSeries, gcd);
    
    
    
//    var fullSeries = [],
//        seriesA = [],
//        seriesB = [],
//        commons = [],
//        i;
//    
//    // generate series
//    for (i = arr[0]; i <= arr[0] * arr[1]; i += 1) {
//        fullSeries.push(i);
//    }
//    
//    // build array of arr[0] multiples
//    fullSeries.forEach(function (num) {
//        if (num % arr[0] === 0) {
//            seriesA.push(num);
//        }
//    });
//    
//    // build array of arr[1] multiples
//    fullSeries.forEach(function (num) {
//        if (num % arr[1] === 0) {
//            seriesB.push(num);
//        }
//    });
//    
//    seriesA.forEach(function (numA) {
//        
//        seriesB.forEach(function (numB) {
//            // console.log(numA, (numA === numB));
//            if (numA === numB) {
//                commons.push(numA);
//            }
//        });
//        
//    });
//    
//    return commons[0];
}

console.log(
    smallestCommons([1,5])
);
