/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function divide(a, b) {
  var neg1 = !!(a[0] === "-");
  var neg2 = !!(b[0] === "-");
  if (a[0] === "+" || a[0] === "-") {
    a = a.slice(1);
  }
  if (b[0] === "+" || b[0] === "-") {
    b = b.slice(1);
  }
  if (b === "0") {
    throw "divider cannot be zero!";
  }
  if (a === "0") {
    return "0";
  }
  if (b === "1") {
    return neg1 ^ neg2 ? "-" + a : a;
  }
  var count = 1;
  var res = b;
  console.log(count);
  while (res.length <= a.length && (+res < +a || res < a)) {
    res = addPositive(res, b);
    count++;
  }
  console.log(count);
  count--;

  if (neg1 ^ neg2) {
    return "-" + count;
  }
  return "" + count;
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
// console.log(divide('9999999999999999999999999999999999','-9999999999999999999999999999999998'))
// console.log(divide("1111111111111111111111", "-999999999998"));
// compare
// '123455' > '999', but string compare is the reverse
// '9999999999999999999999999999999999' & '9999999999999999999999999999999998' use string compare

console.log(BigInt("1111111111111111111111") / BigInt("-999999999998"));
