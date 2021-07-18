// 75. implement BigInt subtraction

// 1000000000000000000000n - 999999999999999999999n
// // 1n
// Suppose BigInt cannot be used, can you implement a string subtraction function by yourself?

// subtract('1000000000000000000000', '999999999999999999999')
// // '1'
// All input are valid non-negative integer strings, and the result is guaranteed to be non-negative.

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function subtract(num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1;
  let carry = 0;
  let res = "";
  while (i >= 0) {
    let n1 = parseInt(num1[i]) - carry;
    let n2 = j >= 0 ? parseInt(num2[j]) : 0;
    if (n1 < n2) {
      carry = 1;
      n1 = n1 + 10;
    } else {
      carry = 0;
    }
    res = n1 - n2 + res;
    i--;
    j--;
  }
  if (res[0] === "0") {
    return removeLeadingZeros(res);
  }
  return res;
}
function removeLeadingZeros(s) {
  let i = 0;
  while (s.length > 1 && s[i] === "0") {
    i++;
  }
  if (i >= s.length) {
    i--;
  }
  return s.slice(i);
}
// const ans = subtract('100', '100');
// console.log(ans);
