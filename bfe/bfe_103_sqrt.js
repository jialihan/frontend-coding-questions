/**
 * @param {any} x
 * @return {number}
 */
function mySqrt(x) {
  if (x < 0) {
    return NaN;
  }
  if (x <= 1) {
    return x;
  }
  var l = 1;
  var r = Math.floor(x / 2);
  while (l <= r) {
    var mid = Math.floor((l + r) / 2);
    if (mid ** 2 === x) {
      return mid;
    } else if (mid ** 2 < x) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return r;
}
// tests
// edge case:
// '-1000' => NaN
// 'string' => NaN
// -Infinity => NaN
