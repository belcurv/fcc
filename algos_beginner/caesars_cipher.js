/* Generate A-Z Alphabet
 *
 * @params                 [none]
 * @returns    [array]     [array of letters A thru Z]
 */
function makeAlphabet() {
    return Array.apply(null, Array(26)).map(function (el, index) {
        return String.fromCharCode(index + 65);
    });
}

/* Decrypt Character Array
 *
 * @params    [array]   encryptedArr   [encrypted char array]
 * @params    [array]   alphabet       [A-Z char array]
 * @returns   [array]                  [decrypted char array]
 */
function makeNewStringArray(encryptedArr, alphabet) {
    return encryptedArr.map(function (char, ind) {

        if (alphabet.indexOf(char) === -1) {
            return char;
        } else if (alphabet.indexOf(char) >= 13) {
            // Must 'wrap' alphabet index at or above 26.
            // So ... any index > 13, subtract 13.
            return alphabet[alphabet.indexOf(char) - 13];
        } else {
            return alphabet[alphabet.indexOf(char) + 13];
        }
    });
}

function rot13(str) { // LBH QVQ VG!
    
    console.time('boogers');

    var alphabet = makeAlphabet(),
        stringArr = str.split(''),
        decrypted = makeNewStringArray(stringArr, alphabet).join('');
    
    console.timeEnd('boogers');

    return decrypted;

}

// Change the inputs below to test
console.log(
    rot13("SERR PBQR PNZC")
    );