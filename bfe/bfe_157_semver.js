/**
 * @param {string} v1
 * @param {string} v2
 * @returns 0 | 1 | -1
 */
function compare(v1, v2) {
  var arr1 = v1.split(".");
  var arr2 = v2.split(".");
  for (var i = 0; i < 3; i++) {
    var a = parseInt(arr1[i]);
    var b = parseInt(arr2[i]);
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      continue;
    }
  }
  return 0;
}
