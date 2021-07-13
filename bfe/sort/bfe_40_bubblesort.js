// https://bigfrontend.dev/problem/implement-Bubble-Sort
// References: https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/

/**
 * @param {number[]} arr
 */
function bubbleSort(arr) {
  var n = arr.length;
  for (var i = 0; i < n; i++)
    for (var j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
}
