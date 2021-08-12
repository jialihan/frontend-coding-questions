// Given a non-empty string, return the most frequently ocurring character.

// If there are multiple characters with same occurrance, return an array of them.

// count('abbccc')
// // 'c'

// count('abbcccddd')
// // ['c', 'd']
// Follow-up: What is the time & space complexity of your approach?

/**
 * @param {string} str
 * @returns {string | string[]}
 */

function count(str) {
  var map = new Map();
  for (var c of [...str]) {
    map.set(c, (map.has(c) ? map.get(c) : 0) + 1);
  }
  var max = 0;
  var res = [];
  for (var [k, v] of map.entries()) {
    if (v === max) {
      res.push(k);
    } else if (v > max) {
      max = v;
      res = [k];
    }
  }
  return res.length === 1 ? res[0] : res;
}
