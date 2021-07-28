/**
 * @param {string} str
 * @return {number}
 */
function countPalindromicSubstr(str) {
  var n = str.length;
  var dp = new Array(n).fill(0).map((el) => new Array(n).fill(false));
  var count = 0;
  // init: one or two chars
  for (var i = 0; i < n; i++) {
    dp[i][i] = true;
    count++;
    if (i > 0 && str[i] === str[i - 1]) {
      dp[i - 1][i] = true;
      count++;
    }
  }
  // build dp for len = 3..n
  for (var len = 3; len <= n; len++) {
    for (var i = 0; i <= n - len; i++) {
      var j = i + len - 1;
      dp[i][j] = str[i] === str[j] && dp[i + 1][j - 1];
      if (dp[i][j]) {
        count++;
      }
    }
  }
  return count;
}
