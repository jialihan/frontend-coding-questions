// 51. search element right after target with Binary Search(possible duplicate array)
// Your are given a sorted ascending array of number,
// but might have duplicates, you are asked to
// return the element right after last appearance of a target number.

// If not found return undefined.

/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function elementAfter(arr, target) {
  // upper bound: first index that strictly > target
  var l = 0;
  var r = arr.length - 1;
  while (l <= r) {
    var mid = Math.ceil((l + r) / 2);
    if (arr[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return l === 0 || arr[l] === target ? undefined : arr[l];
}
