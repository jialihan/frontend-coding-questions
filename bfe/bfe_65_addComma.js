/**
 * @param {number} num
 * @return {string}
 */
function addComma(num) {
  var [integer, fraction] = String(num).split(".");
  var count = 0;
  var res = "";
  for (var i = integer.length - 1; i >= 0; i--) {
    res = integer[i] + res;
    if (++count === 3 && i !== 0) {
      res = "," + res;
      count = 0;
    }
  }
  return fraction ? res + "." + fraction : res;
}
// console.log(addComma(1)) // '1'
// console.log(addComma(1000)) // '1,000'
// console.log(addComma(-12345678)) // '-12,345,678'
// console.log(addComma(12345678.12345)) // '12,345,678.12345'
