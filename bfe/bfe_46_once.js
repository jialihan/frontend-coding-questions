// _.once(func) is used to force a function to be called only once, later calls only returns the result of first call.

// Can you implement your own once()?

// function func(num) {
//   return num
// }

// const onced = once(func)

// onced(1)
// // 1, func called with 1

// onced(2)
// // 1, even 2 is passed, previous result is returned

/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
  var isCalled = false;
  var res;
  return function (...args) {
    if (!isCalled) {
      isCalled = true;
      res = func.apply(this, args);
    }
    return res;
  };
}
