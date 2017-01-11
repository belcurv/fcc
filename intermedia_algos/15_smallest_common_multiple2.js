/* jshint esversion:6 */
/* globals console */

/* Find the smallest common multiple of the provided parameters that can
   be evenly divided by both, AS WELL AS BY ALL SEQUENTIAL NUMBERS IN THE
   RANGE between these parameters.
   
   The range will be an array of two numbers that will not necessarily be
   in numerical order.
   
   e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3
   that is evenly divisible by all numbers between 1 and 3.
   
   https://www.youtube.com/watch?v=wBqlde4f5Aw
   
   to find LCM for more than 2 numbers, have to use prime factorization method
   
   18          19            20          21           22          23
   2, 3, 3     1, 19         2, 2, 5     3, 7         2, 11       1, 23
   
   
*/


function getPrimes(number) {
    var i = 2;
    
    var primes = [];
    
    while (i <= number) {
        if (number % i === 0) {
            primes.push(i);
            number /= i;
        } else {
            i += 1;
        }
    }
    
    return primes;
}


// find smallest common multiple
function smallestCommons(arr) {
    
    // sort input array low to high
    arr = arr.sort( (a, b) => a - b );
    
    // generate number series, inclusive of start & finish
    var series = [];
    
    for (var i = arr[0]; i <= arr[1]; i += 1) {
        series.push(i);
    }
    
    // log whole series
    console.log('Input series: ' + series);
    
    // build prime factors array
    var primesArr = series.map(function (num) {
        return getPrimes(num);
    });
    
    // log primes array
    console.log(primesArr);
    
    return primesArr
        .reduce(function (a, b) {
            return a.concat(b);
        })
        .reduce(function (acc, val) {
            return acc * val;
        });

}

//console.log(
//    smallestCommons([1, 5])
//    // should return 60
//);
//console.log(
//    smallestCommons([5, 1])
//    // should return 60  
//);
//console.log(
//    smallestCommons([1, 13])
//    // should return 360360.
//);
console.log(
    smallestCommons([23, 18])
    // should return 6056820
);