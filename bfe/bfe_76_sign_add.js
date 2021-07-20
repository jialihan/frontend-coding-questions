/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  var neg1 = !!(num1[0] === "-");
  var neg2 = !!(num2[0] === "-");
  if (num1[0] === "+" || num1[0] === "-") {
    num1 = num1.slice(1);
  }
  if (num2[0] === "+" || num2[0] === "-") {
    num2 = num2.slice(1);
  }
  if (neg1 && neg2) {
    return "-" + addPositive(num1, num2);
  } else if (!neg1 && !neg2) {
    return addPositive(num1, num2);
  } else {
    if (neg1) {
      if (isLarger(num1, num2)) {
        return "-" + subtract(num1, num2);
      } else {
        return subtract(num2, num1);
      }
    } else {
      if (isLarger(num2, num1)) {
        return "-" + subtract(num2, num1);
      } else {
        return subtract(num1, num2);
      }
    }
  }
}
function isLarger(num1, num2) {
  // check if num1 is strictly larger than num2
  if (num1.length > num2.length) {
    return true;
  } else if (num2.length > num1.length) {
    return false;
  } else {
    var i = 0;
    while (i < num1.length) {
      if (parseInt(num1[i]) > parseInt(num2[i])) {
        return true;
      } else if (parseInt(num1[i]) < parseInt(num2[i])) {
        return false;
      } else {
        i++;
      }
    }
    return false; // actually is equal
  }
}

// Add Positive
function addPositive(num1, num2) {
  var s1 = reverseString(num1);
  var s2 = reverseString(num2);
  var carry = 0;
  var i = 0,
    j = 0;
  var res = "";
  while (i < s1.length || j < s2.length) {
    var cur =
      (s1[i] ? parseInt(s1[i]) : 0) + (s2[j] ? parseInt(s2[j]) : 0) + carry;
    carry = Math.floor(cur / 10);
    cur = cur % 10;
    res += cur;
    i++;
    j++;
  }
  if (carry) {
    res += carry;
  }
  return reverseString(res);
}
function reverseString(str) {
  return str.split("").reverse().join("");
}
// Subtract - result always positive
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

// Test
console.log(add("-999999999999999999", "-1"));
// '-1000000000000000000'

console.log(add("-999999999999999999", "+1"));
// '-999999999999999998'
