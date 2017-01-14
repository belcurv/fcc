/* jshint esversion:6 */
/* globals console */

/* Sum all the prime numbers up to and including the provided number.

   Solution requires:
   1) make array of numbers from 1 to 'num'
   2) loop over that array,
   3) creating another array of numbers from 1 to 'val',
   4) filter that new array, return all even factors for each 'val',
   5) Finally, add any 'val' with only 2 factors to 'output' value.
*/

function sumPrimes(num) {
    
    var series = Array.apply(null, {length: num}).map((n, i) => i + 1),
        output = 0;
    
    series.forEach(function (val) {
        
        var factors = Array
            .apply(null, {length: val})
            .map((n, i) => i + 1)
            .filter((el) => val % el === 0);
        
        if (factors.length === 2) {
            output += val;
        }
        
    });
    
    return output;
}

// tests
console.log(
    sumPrimes(10)  // should return 17
);
console.log(
    sumPrimes(977)  // should return 73156
);