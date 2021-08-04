// 121. A number sequence

// Here is a sequence:

// '1', first number is 1
// '11', since previous number has One(1) 1
// '21', since previous number has Two(2) 1s
// '1211', since previous number has One(1) 2 and One(1) 1
// '111221', since previous number has One(1) 1, One(1) 2, Two(2) 1s
// '312211', since previous number has Three(3) 1s, Two(2) 2s, One(1) 1
// ....

/**
 * @param {number} n - integer
 * @returns {string}
 */
/**
 * @param {number} n - integer
 * @returns {string}
 */
function getNthNum(n) {
  if (n === 1) {
    return "1";
  }
  var pre = "1";
  for (var i = 2; i <= n; i++) {
    var cur = countPreString(pre);
    pre = cur;
  }
  return pre;
}
function countPreString(s) {
  var cnt = 1;
  var i = 1;
  var res = "";
  for (var j = 1; j <= s.length; j++) {
    if (j === s.length) {
      res += cnt + s[s.length - 1];
      break;
    }
    if (s[j] === s[j - 1]) {
      cnt++;
    } else {
      res += cnt + s[j - 1];
      cnt = 1;
    }
  }
  return res;
}
