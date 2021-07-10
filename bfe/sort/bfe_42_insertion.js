// 42. implement Insertion Sort
// Reference:
// - https://stackabuse.com/insertion-sort-in-javascript
// - https://medium.com/dailyjs/insertion-sort-in-javascript-9c077844717a

/**
 * @param {number[]} arr
 */
function insertionSort(arr) {
  // your code here
  for (var i = 1; i < arr.length; i++) {
    var j = i - 1;
    var cur = arr[i];
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = cur;
  }
}
