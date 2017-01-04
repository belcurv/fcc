/* jshint esversion:6 */
/* globals console */

/* Make a function that 
   1) looks through an array of objects (first argument)
   2) returns an array of all objects that have matching property and value
      pairs (second argument).
   
   Each property and value pair of the source object has to be present in
   the object from the collection if it is to be included in the returned array.
   
   For example, if the first argument is:
   [{ first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }]
   
   ... and the second argument is:
   { last: "Capulet" }
   
   ... then you must return the third object from the collection because
   it contains the property/value pair passed as the second argument.
   
   Global Object
   Object.prototype.hasOwnProperty()
   Object.keys()

*/


function whatIsInAName(collection, source) {
    // What's in a name?
    var arr = [];
    // Only change code below this line
    
    var sourceKeys = Object.keys(source);
    
    collection.forEach(function (obj) {
//        console.log(obj);
        sourceKeys.forEach(function (key) {
            if (obj.hasOwnProperty(key) && obj[key] === source[key]) {
                console.log(obj);
            }
        });
        
    });
    
    
    // Only change code above this line
    return arr;
}

console.log('should return \n [{ a: 1, b: 2 }, { a: 1, b: 2, c: 2 }]');
console.log(
    whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 })
    // should return [{ "a": 1, "b": 2 }, { "a": 1, "b": 2, "c": 2 }]
);

// passes
//console.log(
//    whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" })
//    // should return [{ first: "Tybalt", last: "Capulet" }]
//);

// passes
//console.log(
//    whatIsInAName([{ "a": 1 }, { "a": 1 }, { "a": 1, "b": 2 }], { "a": 1 })
//    // should return [{ "a": 1 }, { "a": 1 }, { "a": 1, "b": 2 }]
//);


// fails
//console.log(
//    whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "c": 2 })
//    // should return [{ "a": 1, "b": 2, "c": 2 }]
//);

