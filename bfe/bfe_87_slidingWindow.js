// Given a string, please find the longest substring that has no repeated characters.

// If there are multiple result, any one substring is fine.

// longestUniqueSubstr('aaaaa')
// // 'a'
// longestUniqueSubstr('abcabc')
// // 'abc', or 'bca', or 'cab'
// longestUniqueSubstr('a12#2')
// // 'a12#'
// Follow-up

// What is the time & space cost of your solution ? Could you do it better?

// Sliding Window + Set - Time O(n) Space O(n)

/**
 * @param {string} str
 * @return {string}
 */
function longestUniqueSubstr(str) {
  var set = new Set();
  var start = 0;
  var max = 0;
  var res = "";
  for (var i = 0; i < str.length; i++) {
    if (!set.has(str[i])) {
      set.add(str[i]);
      continue;
    }
    if (i - start > max) {
      max = i - start;
      res = str.slice(start, i);
    }
    while (str[start++] !== str[i]) {}
  }
  return res;
}
// test
console.log(longestUniqueSubstr("aaaaa"));
// 'a'
console.log(longestUniqueSubstr("abcabc"));
// 'abc', or 'bca', or 'cab'
console.log(longestUniqueSubstr("a12#2"));
// 'a12#');
