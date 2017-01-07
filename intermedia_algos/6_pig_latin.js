/* jshint esversion:6 */
/* globals console */

/* Translate the provided string to pig latin.

first consonant (or consonant cluster) moves to the end of the word + suffix "ay".

If a word begins with a vowel you just add "way" to the end.

Input strings are guaranteed to be English words in all lowercase.

Here are some helpful links:
    Array.prototype.indexOf()
    Array.prototype.push()
    Array.prototype.join()
    String.prototype.substr()
    String.prototype.split()
*/

///////////// LAME WAY ///////////////////
//function translatePigLatin(str) {
//    
//    var regex = /(?![aeiou])[a-z]/,
//        strArr = str.split(''),
//        char1,
//        char2;
//    
//    if (regex.test(strArr[0]) && regex.test(strArr[1])) {
//        // if first two letters are consonants
//        char1 = strArr.shift();
//        char2 = strArr.shift();
//        strArr.push(char1 + char2 + 'ay');
//        return strArr.join('');
//    } else if (regex.test(strArr[0])) {
//        // if first letter is a consonant
//        char1 = strArr.shift();
//        strArr.push(char1 + 'ay');
//        return strArr.join('');
//    } else {
//        // first letter is a vowel
//        return str + 'way';
//    }
//    
//    return str;
//}

///////////// BETTER ... //////////////////
function translatePigLatin(str) {
    
    var vowels = ['a', 'e', 'i', 'o', 'u'],
        firstVowelInd;
    
    if (vowels.indexOf(str[0]) !== -1) {
        
        return str + 'way';
        
    } else {
        
        // find index of 1st vowel
        firstVowelInd = str.search(/[aeiou]/gi);
        
        return str
            // .slice() returns a new string beginning at the (index)
            .slice(firstVowelInd) + 
            
            // .substr(a, b) selects the substring between index a & b
            str.substr(0, firstVowelInd) + 'ay';
    }

}


/////////////////////// tests ///////////////////////////

console.log(
    translatePigLatin("consonant")  // should return "onsonantcay"
);
console.log(
    translatePigLatin("california") // should return "aliforniacay".
);
console.log(
    translatePigLatin("paragraphs") // should return "aragraphspay".
);
console.log(
    translatePigLatin("glove") // should return "oveglay".
);
console.log(
    translatePigLatin("algorithm") // should return "algorithmway".
);
console.log(
    translatePigLatin("eight") // should return "eightway"
);