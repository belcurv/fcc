/* jshint esversion:6 */
/* globals console */

/* Compare two arrays and return a new array with any items only found in ONE
   of the two arrays, but not both. In other words, return the symmetric
   difference of the two arrays.   
*/

function diffArray(arr1, arr2) {
    
    // filter each array for the absent members
    var filteredArr1 = arr1.filter((el) => arr2.indexOf(el) === -1),
        filteredArr2 = arr2.filter((el) => arr1.indexOf(el) === -1);
    
    // merge both sets of absent members
    return filteredArr1.concat(filteredArr2);
}

// test it!
console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],["diorite", "andesite", "grass", "dirt", "dead shrub"]));
// should return ["pink wool"].

console.log(diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"],["diorite", "andesite", "grass", "dirt", "dead shrub"]));
// should return ["diorite", "pink wool"].

console.log(diffArray(["andesite", "grass", "dirt", "dead shrub"],["andesite", "grass", "dirt", "dead shrub"]));
// should return [].

console.log(diffArray([1, 2, 3, 5],[1, 2, 3, 4, 5]));
// should return [4].

console.log(diffArray([1, "calf", 3, "piglet"],[1, "calf", 3, 4]));
// should return ["piglet", 4].

console.log(diffArray([],["snuffleupagus", "cookie monster", "elmo"]));
// should return ["snuffleupagus", "cookie monster", "elmo"].

console.log(diffArray([1, "calf", 3, "piglet"],[7, "filly"]));
// should return [1, "calf", 3, "piglet", 7, "filly"]