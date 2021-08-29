//  https://bigfrontend.dev/problem/implement-basic-throttle

/**
 * @param {Function} func
 * @param {number} wait
 */
function throttle(fn, time) {
  var isThrottle;
  var lastArgs;
  return function (...args) {
    if (!isThrottle) {
      fn(...args);
      isThrottle = true;
      setTimeout(() => {
        // check any trailing edge last call
        if (lastArgs) {
          fn(...lastArgs);
        }
        isThrottle = null; // reset to initial condition
        lastArgs = null; // reset to initial condition
      }, time);
    } else {
      lastArgs = [...args];
    }
  };
}
