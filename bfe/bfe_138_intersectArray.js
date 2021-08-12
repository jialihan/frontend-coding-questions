/**
 * @param {number[]} arr1 - integers
 * @param {number[]} arr2 - integers
 * @returns {number[]}
 */
function intersect(arr1, arr2) {
  // count arr1
  var cnt = new Map();
  for (var num of arr1) {
    cnt.set(num, cnt.has(num) ? cnt.get(num) + 1 : 1);
  }
  // count arr2
  var res = [];
  for (var num of arr2) {
    if (cnt.has(num)) {
      res.push(num);
      var cur = cnt.get(num);
      if (cur === 1) {
        cnt.delete(num);
      } else {
        cnt.set(num, cur - 1);
      }
    }
  }
  return res;
}
