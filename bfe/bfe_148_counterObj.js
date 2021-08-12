// Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

// Tips:
// 1. If a descriptor has both [value or writable] and [get or set] keys, an exception is thrown.
// 2. configurable should be "true"

function createCounter() {
  var cnt = 0;
  var obj = {};
  Object.defineProperty(obj, "count", {
    // If a descriptor has both [value or writable] and [get or set] keys, an exception is thrown.
    // writable: false,
    configurable: true,
    get() {
      return cnt++;
    }
    // set() is undefined by default, then it's good
  });
  return obj;
}
