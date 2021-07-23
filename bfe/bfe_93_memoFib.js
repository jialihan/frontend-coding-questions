// please modify code below to make it work for large number like `fib(1000)`
// recursion should still be used

function fib(n, map = new Map()) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (map.has(n)) {
    return map.get(n);
  }
  var res = fib(n - 1, map) + fib(n - 2, map);
  map.set(n, res);
  return res;
}
