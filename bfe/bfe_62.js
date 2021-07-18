// string addition
// bigint addition
// What if we need to do it by ourselves for older browsers?

// You are asked to implement a string addition function, with all non-negative integers in string.

// add('999999999999999999', '1')
// // '1000000000000000000'

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  var s1 = reverseString(num1);
  var s2 = reverseString(num2);
  var carry = 0;
  var i = 0,
    j = 0;
  var res = "";
  while (i < s1.length || j < s2.length) {
    var cur =
      (s1[i] ? parseInt(s1[i]) : 0) + (s2[j] ? parseInt(s2[j]) : 0) + carry;
    carry = Math.floor(cur / 10);
    cur = cur % 10;
    res += cur;
    i++;
    j++;
  }
  if (carry) {
    res += carry;
  }
  return reverseString(res);
}
function reverseString(str) {
  return str.split("").reverse().join("");
}
