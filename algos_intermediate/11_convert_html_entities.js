/* jshint esversion:6 */
/* globals console */

/* Convert the HTML special characters in a string to their
   corresponding HTML entities.
*/

function convertHTML(str) {
  // &colon;&rpar; :)
    
    var regex = /[&,<,>,",']/gi;
    
    function convertToHtml(match) {
        
        var codex = {
            '&' : '&amp;',
            '<' : '&lt;',
            '>' : '&gt;',
            '"' : '&quot;',
            "'" : '&apos;'
        };
        
        return codex[match];
    }
    
    return str.replace(regex, convertToHtml);
}


// tests

console.log(
    convertHTML("Dolce & Gabbana")
    // should return Dolce &​amp; Gabbana
);
console.log(
    convertHTML("Hamburgers < Pizza < Tacos")
    // should return Hamburgers &​lt; Pizza &​lt; Tacos.
);
console.log(
    convertHTML("Sixty > twelve")
    // should return Sixty &​gt; twelve.
);
console.log(
    convertHTML('Stuff in "quotation marks"')
    // should return Stuff in &​quot;quotation marks&​quot;.
);
console.log(
    convertHTML("Shindler's List")
    // should return Shindler&​apos;s List.
);
console.log(
    convertHTML("<>")
    // should return &​lt;&​gt;.
);
console.log(
    convertHTML("abc")
    // should return abc.
);