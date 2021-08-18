// 7. implement debounce() with leading & trailing option
// In this problem, you are asked to implement an enhanced debounce() which accepts third parameter, option: {leading: boolean, trailing: boolean}

// leading: whether to invoke right away
// trailing: whether to invoke after the delay.

function debounce(func, wait, option = { leading: false, trailing: true }) {
  if (!option.leading && !option.trailing) {
    // never get triggered
    return () => {};
  }
  var timer;
  var lastArgs;
  return function (...args) {
    lastArgs = args;
    if (!timer && option.leading) {
      func(...args); // invoke first call
      lastArgs = null;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (option.trailing && lastArgs) {
        func(...lastArgs);
      }
      timer = null;
    }, wait);
  };
}
