// Reference:
// https://bigfrontend.dev/problem/implement-btoa
// https://en.wikipedia.org/wiki/Base64

/**
 * @param {string} encoded
 * @return {string}
 */
var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function myAtob(encoded) {
  if (!encoded) {
    return "";
  }
  var res = "";
  var binaryString = "";
  var i = 0;
  var paddingCnt = 0;
  for (; i < encoded.length; i++) {
    if (encoded[i] === "=") {
      paddingCnt++;
      continue;
    }
    binaryString += table.indexOf(encoded[i]).toString(2).padStart(6, "0");
  }
  // check valid
  var len = binaryString.length + paddingCnt * 6;
  if (len < 8 || len % 8 !== 0) {
    throw "error";
  }
  // reconstruct for each 8 digits
  while (binaryString.length >= 8) {
    var cur = binaryString.slice(0, 8);
    res += String.fromCharCode(parseInt(cur, 2));
    binaryString = binaryString.slice(8);
  }
  return res;
}
//  Test: Pay attention to edge case:

console.log(myAtob("QkZFLmRldg==")); // 'BFE.dev'
console.log(myAtob("IUAjJ")); // why throw
