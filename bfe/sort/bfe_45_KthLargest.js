// use quicksort  - middle point partition
// ALSO LC 215.: https://leetcode.com/problems/kth-largest-element-in-an-array/
/**
 * @param {number[]} arr
 * @param {number} k
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var K;
var findKthLargest = function (arr, k) {
  K = arr.length - k;
  return quicksort(arr, 0, arr.length - 1);
};
function quicksort(arr, left, right) {
  var pivot = partition(arr, left, right);
  if (pivot === K) {
    return arr[K];
  } else if (K < pivot) {
    return quicksort(arr, left, pivot - 1);
  } else if (K > pivot) {
    return quicksort(arr, pivot + 1, right);
  }
}
function partition(arr, left, right) {
  var mid = Math.floor((left + right) / 2);
  [arr[mid], arr[right]] = [arr[right], arr[mid]];
  var pivot = arr[right];
  var i = left;
  var j = right - 1;
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}
