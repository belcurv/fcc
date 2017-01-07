/* jshint esversion:6 */
/* globals console */

/* The DNA strand is missing the pairing element. Take each character,
   get its pair, and return the results as a 2d array.
   
   Base pairs are a pair of AT and CG. Match the missing element to
   the provided character.
   
   Return the provided character as the first element in each array.
*/

function pairElement(str) {
    
    var compliment;
    
    return str
        .split('')
        .map(function (nucleotide) {
        
            if (nucleotide === 'A' | nucleotide === 'T') {
                compliment = (nucleotide === 'A') ? 'T' : 'A';
                return [nucleotide, compliment];
            } else {
                compliment = (nucleotide === 'C') ? 'G' : 'C';
                return [nucleotide, compliment];
            }
    });
}


// tests!
console.log(
    pairElement("GCG")
    // should return [["G", "C"], ["C","G"],["G", "C"]]
);

console.log(
    pairElement("ATCGA")
    // should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]]
);

console.log(
    pairElement("TTGAG")
    // should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]]
);

console.log(
    pairElement("CTCTA")
    // should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]]
);