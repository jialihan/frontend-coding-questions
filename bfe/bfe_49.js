/**
 * // 49. search last index with Binary Search(possible duplicate array)
 * Your are given a sorted ascending array of number,
 * but might have duplicates, you are asked to return
 * the last index of a target number.
 */
function lastIndex(arr, target) {
  var l = 0;
  var r = arr.length - 1;
  while (l <= r) {
    var mid = Math.ceil((l + r) / 2);
    if (arr[mid] === target) {
      if (l === r) {
        return l;
      }
      l = mid;
    } else if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return -1;
}
