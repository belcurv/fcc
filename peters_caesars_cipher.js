for (var i = 0; i < 300; i++) {
    console.log("code: " + i + " | char: " + String.fromCharCode(i));
}


// 65 = A
// 77 = M
// 97 = a
// 109 = m

function rot13(str) { // LBH QVQ VG!
    var returnString = "";

    for (var i = 0; i < str.length; i++) {
        var strCode = str.charCodeAt(i);
        if (strCode >= 65 && strCode <= 90) {
            if (strCode <= 77) {
                returnString += String.fromCharCode(strCode + 13);
            } else {
                returnString += String.fromCharCode(strCode - 13);
            }
        } else if (strCode >= 97 && strCode <= 122) {
            if (strCode <= 109) {
                returnString += String.fromCharCode(strCode + 13);
            } else {
                returnString += String.fromCharCode(strCode - 13);
            }
        } else {
            returnString += str[i];
        }
    }

    return returnString;

}

console.log(
    rot13('LBH QVQ VG!')
);