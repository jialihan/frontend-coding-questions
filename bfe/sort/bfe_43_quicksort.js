// 43. implement Quick Sort
// reference: https://www.guru99.com/quicksort-in-javascript.html
/**
 * @param {number[]} arr
 */
function quickSort(arr) {
  quicksort(arr, 0, arr.length - 1);
}
function quicksort(arr, left, right) {
  if (left >= right) {
    return;
  }
  var pivot = partition(arr, left, right);
  quicksort(arr, left, pivot - 1);
  quicksort(arr, pivot + 1, right);
}
function partition(arr, left, right) {
  var mid = Math.floor((left + right) / 2);
  [arr[mid], arr[right]] = [arr[right], arr[mid]]; // swap pivot to the end
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
  [arr[i], arr[right]] = [arr[right], arr[i]]; // swap back original pivot value
  return i;
}
// Test
const a = [4, 2, 100, 99, 10000, -1, 99, 2];
quickSort(a);
console.log(a);
// Output: 1st round
// pivot = 99, mid = 3
// after sort 1st round: [4, 2,2,-1, 10000, 99, 99,100]
// return i = 4; ( arr[i] = 10000)
// Next: sort[0, 3], sort[4, 7]
// sort(left, i-1), sort(i, right)
