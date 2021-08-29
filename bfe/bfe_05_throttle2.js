// Notes:

// 1. leading: if false, just skip the first invoke
// 2. trailing: check lastArgs, then set timer again after the trailing edge call

function throttle(fn, wait, option = { leading: true, trailing: true }) {
  if (!option.leading && !option.trailing) {
    // never get triggered
    return () => {};
  }
  var isThrottle;
  var lastArgs;

  function setTimer() {
    isThrottle = true;
    setTimeout(() => {
      isThrottle = false;
      // check any trailing edge last call
      if (option.trailing && lastArgs) {
        fn(...lastArgs);
        lastArgs = null;
        setTimer(); // setTimer() again at trailing edge call
      }
    }, wait);
  }
  return function (...args) {
    if (!isThrottle) {
      if (option.leading) {
        fn(...args); // invoke at the leading edge
      }
      setTimer();
    } else {
      lastArgs = [...args];
    }
  };
}
