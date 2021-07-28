// 106. Find two numbers that sum up to 0

// There might be multiple pairs, any of them would do. If not found, return null

// findTwo([1,2,3,-1])
// // [0,3]

// findTwo([1,2,3,-1,-2,0])
// // [0,3] or [1,4] or [5, 5]

// findTwo([1,2,3,4])
// // null

/**
 * @param {number[]} arr
 * @return {number[]}
 */
function findTwo(arr) {
  var map = new Map(); // <val, index>
  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    if (map.has(-num)) {
      return [i, map.get(-num)];
    }
    map.set(num, i);
  }
  return null;
}
