// Reference to 76: with sign to multiply
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function multiply(a, b) {
  var neg1 = !!(a[0] === "-");
  var neg2 = !!(b[0] === "-");
  if (a[0] === "+" || a[0] === "-") {
    a = a.slice(1);
  }
  if (b[0] === "+" || b[0] === "-") {
    b = b.slice(1);
  }
  var n = b.length;
  var preSum;
  for (var i = n - 1; i >= 0; i--) {
    var tmp = singleDigitMultiply(a, b[i]);
    if (i === n - 1) {
      preSum = tmp;
    } else {
      tmp = appendZero(tmp, n - 1 - i);
      preSum = addPositive(preSum, tmp);
    }
  }
  if (neg1 ^ neg2) {
    preSum = "-" + preSum;
  }
  return preSum;
}
function addPositive(num1, num2) {
  var carry = 0;
  var i = num1.length - 1,
    j = num2.length - 1;
  var res = "";
  while (i >= 0 || j >= 0) {
    var cur =
      (i >= 0 ? parseInt(num1[i]) : 0) +
      (j >= 0 ? parseInt(num2[j]) : 0) +
      carry;
    carry = Math.floor(cur / 10);
    cur = cur % 10;
    res = cur + res;
    i--;
    j--;
  }
  if (carry) {
    res = carry + res;
  }
  return res;
}
//   console.log(addPositive('111', '222'));
function singleDigitMultiply(s, a) {
  if (a === "0") {
    return "0";
  }
  var i = s.length - 1;
  var carry = 0;
  var res = "";
  a = parseInt(a);
  while (i >= 0) {
    var cur = parseInt(s[i]) * a + carry;
    carry = Math.floor(cur / 10);
    cur = cur % 10;
    res = cur + res;
    i--;
  }
  if (carry > 0) {
    res = carry + res;
  }
  return res;
}
function appendZero(s, count = 0) {
  for (var i = 0; i < count; i++) {
    s += "0";
  }
  return s;
}
// console.log(singleDigitMultiply('1123456787654323456789', '6'));
// console.log(multiply("1123456787654323456789", "1234567887654323456"));
// // '1386983673205309924427166592431045142784')
