// 107. Find the largest difference

// largestDiff([-1, 2,3,10, 9])
// // 11,  obviously Math.abs(-1 - 10) is the largest

// largestDiff([])
// // 0

// largestDiff([1])
// // 0

/**
 * @param {number[]} arr
 * @return {number}
 */
function largestDiff(arr) {
  if (arr.length <= 1) {
    return 0;
  }
  var max = -Infinity,
    min = Infinity;
  for (var num of arr) {
    if (num > max) {
      max = num;
    }
    if (num < min) {
      min = num;
    }
  }
  return max - min;
}
