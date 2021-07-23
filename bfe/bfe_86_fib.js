// Two Pointer: Time O(n), Space O(1)
/**
 * @param {number} n - non-negative integer
 * @return {number}
 */
function fib(n) {
  if (n <= 1) {
    return n;
  }
  var pre1 = 0,
    pre2 = 1;
  for (var i = 2; i <= n; i++) {
    var cur = pre1 + pre2;
    pre1 = pre2;
    pre2 = cur;
  }
  return pre2;
}

//   MEMO: Time O(n), Space O(n)
//   Actually, it's already proved that "bottom up" solution is the straightforward and most efficient, i do NOT understand why so many recommend the "memo" version, or just because it sounds more professional, but MEMO is NOT the most optimized solution.

function fib(n, memo = new Map()) {
  if (n <= 1) {
    return n;
  }
  if (memo.has(n)) {
    return memo.get(n);
  }
  var res = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, res);
  return res;
}
