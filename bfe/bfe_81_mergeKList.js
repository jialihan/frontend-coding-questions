// bfe #81: https://bigfrontend.dev/problem/merge-sorted-arrays
// Also see leetcode 23. merge K list
// https://leetcode.com/problems/merge-k-sorted-lists/

/**
 * @param {number[][]} arrList
 * non-descending integer array
 * @return {number[]}
 */
function merge(arrList) {
  if (!arrList || arrList.length === 0) {
    return arrList;
  }
  // Divide and Conquer
  let cur = [...arrList[0]];
  for (var i = 1; i < arrList.length; i++) {
    cur = mergeTwoList(cur, arrList[i]);
  }
  return cur;
}
function mergeTwoList(a, b) {
  let res = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      res.push(a[i++]);
    } else {
      res.push(b[j++]);
    }
  }
  while (i < a.length) {
    res.push(a[i++]);
  }
  while (j < b.length) {
    res.push(b[j++]);
  }
  return res;
}
