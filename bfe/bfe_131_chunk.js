// 131. implement _.chunk()

// Please implement your chunk(arr: any[], size: number)

// chunk([1,2,3,4,5], 1)
// // [[1], [2], [3], [4], [5]]

// chunk([1,2,3,4,5], 2)
// // [[1, 2], [3, 4], [5]]

// chunk([1,2,3,4,5], 3)
// // [[1, 2, 3], [4, 5]]

// chunk([1,2,3,4,5], 4)
// // [[1, 2, 3, 4], [5]]

// chunk([1,2,3,4,5], 5)
// // [[1, 2, 3, 4, 5]]
// for size smaller than 1, return an empty array.

/**
 * @param {any[]} items
 * @param {number} size
 * @returns {any[][]}
 */
function chunk(items, size) {
  if (!size || size < 1) {
    // edge case: for size smaller than 1, return an empty array.
    return [];
  }
  var res = [];
  while (items.length > 0) {
    var cut = Math.min(items.length, size);
    var cur = [];
    for (var i = 0; i < cut; i++) {
      cur.push(items.shift());
    }
    res.push(cur.slice());
  }
  return res;
}
