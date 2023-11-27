// function isPalindrome(str) {
//     const reversedStr = str.split('').reverse().join('');
//     return str === reversedStr;
//   }

//   module.exports = isPalindrome;

// approach 2

// function isPalindrome(str) {
//   // Remove non-alphanumeric characters and convert to lowercase
//   const cleanStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

//   // Compare the cleaned string with its reverse
//   return cleanStr === cleanStr.split("").reverse().join("");
// }

// module.exports = isPalindrome;

// var re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
// strTest = strTest.replace(re, "")

const cleanedString = process.argv[2]
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]/g, "");      // unable to escape unicode characters
const reversedString = cleanedString.split("").reverse().join("");
console.log(cleanedString === reversedString);



// cypress/e2e/Assignment/PS1/palindrome.js
// cypress/support/palindrome.js
