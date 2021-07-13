// 50. search element right before target with Binary Search(possible duplicate array)
// Your are given a sorted ascending array of number, but might have duplicates,
// you are asked to return the element right before first appearance of a target number.

// If not found return undefined.
/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function elementBefore(arr, target) {
  // lower bound
  var l = 0;
  var r = arr.length - 1;
  while (l < r) {
    var mid = Math.floor((l + r) / 2);
    if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l <= 0 || l >= arr.length || arr[l] !== target
    ? undefined
    : arr[l - 1];
}
