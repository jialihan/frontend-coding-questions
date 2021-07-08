// 14. Implement a general memoization function - `memo()`

/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  var cache = {};
  return function (...args) {
    var key = resolver ? resolver(...args) : Array.from(args).join("_");
    if (!cache[key]) {
      // console.log("cache miss: ", key);
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  };
}

// ### Notes:
// - use default parameter to provide the initial value
//     ```
//      resolver = (...args)=>Array.from(args).join('_')
//     ```
// - use `{}` to cache, you may also use the ES6 `Map()`
// - return a **closure** function, it can always access our internal "cache" object to memo
