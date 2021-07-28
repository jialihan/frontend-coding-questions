// 112. remove duplicate characters in a string

// LC 316. https://leetcode.com/problems/remove-duplicate-letters/

/**
 * @param {string} str
 * @return {string}
 */
function smallestUniqueSubstr(s) {
  var cnt = new Array(26).fill(0);
  var stack = [];
  var visited = new Set();
  var a = "a".charCodeAt(0);
  for (var c of [...s]) {
    var index = c.charCodeAt(0) - a;
    cnt[index]++;
  }
  for (var c of [...s]) {
    var index = c.charCodeAt(0) - a;
    cnt[index]--;
    if (visited.has(c)) {
      continue;
    }
    while (stack.length > 0) {
      var last = stack[stack.length - 1];
      var lastIndex = last.charCodeAt(0) - a;
      // if last bigger char will appear again
      if (last.localeCompare(c) >= 0 && cnt[lastIndex] > 0) {
        var toDelete = stack.pop();
        visited.delete(toDelete);
      } else {
        break;
      }
    }
    visited.add(c);
    stack.push(c);
  }
  return stack.join("");
}
console.log(smallestUniqueSubstr("xyzabcxyzabc"));
/**
 * @param {string} str
 * @return {string}
 */
function smallestUniqueSubstr(s) {
  var cnt = new Array(26).fill(0);
  var stack = [];
  var visited = new Set();
  var a = "a".charCodeAt(0);
  for (var c of [...s]) {
    var index = c.charCodeAt(0) - a;
    cnt[index]++;
  }
  for (var c of [...s]) {
    var index = c.charCodeAt(0) - a;
    cnt[index]--;
    if (visited.has(c)) {
      continue;
    }
    while (stack.length > 0) {
      var last = stack[stack.length - 1];
      var lastIndex = last.charCodeAt(0) - a;
      // if last bigger char will appear again
      if (last.localeCompare(c) >= 0 && cnt[lastIndex] > 0) {
        var toDelete = stack.pop();
        visited.delete(toDelete);
      } else {
        break;
      }
    }
    visited.add(c);
    stack.push(c);
  }
  return stack.join("");
}
// console.log(smallestUniqueSubstr("xyzabcxyzabc"));
