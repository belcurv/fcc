function bouncer(arr) {
    
    var thingy = arr.filter(function (el) {return el ? true : false});
    
    // var thingy = arr.filter(el => el ? 1 : 0);
    
    return thingy;
}

console.log(
    bouncer([7, "ate", "", false, 9])
);
