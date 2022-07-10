/**
 * @param {string} input
 * @returns string
 */
function removeChars(input) {
  input = input.replaceAll("b", "");
  while (input.indexOf("ac") >= 0) {
    input = input.replaceAll("ac", "");
  }
  return input;
}
console.log(removeChars("ab")); // 'a'
console.log(removeChars("abc")); // ''
console.log(removeChars("cabbaabcca")); // 'caa'
