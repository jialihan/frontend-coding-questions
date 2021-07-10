// 37. implement Binary Search (unique)
// You are given an unique & ascending array of integers,
// please search for its index with Binary Search.
// If not found, return -1

function binarySearch(arr, target) {
  var l = 0;
  var r = arr.length - 1;
  while (l <= r) {
    var mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}
