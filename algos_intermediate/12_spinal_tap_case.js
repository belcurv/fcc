/* jshint esversion:6 */
/* globals console */

/* Convert a string to spinal case. Spinal case is
   all-lowercase-words-joined-by-dashes.
   
   Solution requires:
   1) Adding spaces before each Cap character
   2) The replacing all _underscores_ and spaces with dashes
   3) Then lower-casing everything
*/

function spinalCase(str) {
    
    var regex1 = /(?!^)([A-Z])/g,  // find caps that are NOT 1st char of string
        regex2 = /[_\s]+/g;        // find underscore and 'space'-like chars
    
    return str
        .replace(regex1, ' $1') // replace cap chars with 'space + same char'
        .replace(regex2, '-')   // replace underscores and spaces with dashes
        .toLowerCase();         // lower-case the whole result
}

// tests
console.log(
    spinalCase("This Is Spinal Tap") // should return "this-is-spinal-tap".
);
console.log(
    spinalCase("thisIsSpinalTap")    // should return "this-is-spinal-tap".
);
console.log(
    spinalCase("The_Andy_Griffith_Show") // should return "the-andy-griffith-show".
);
console.log(
    spinalCase("Teletubbies say Eh-oh") // should return "teletubbies-say-eh-oh".
);
console.log(
    spinalCase("AllThe-small Things") // should return "all-the-small-things"
);