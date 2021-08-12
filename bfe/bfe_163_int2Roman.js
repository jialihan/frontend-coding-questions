/**
 * @param {number} integer
 * @returns {string} str - roman numeral string
 */
var intToRoman = function (num) {
  var dict = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];
  var res = "";
  for (var [scale, val] of dict) {
    while (num >= scale) {
      res += val;
      num -= scale;
    }
    if (num <= 0) {
      break;
    }
  }
  return res;
};

// ALSO SEE LC 12. https://leetcode.com/problems/integer-to-roman/
