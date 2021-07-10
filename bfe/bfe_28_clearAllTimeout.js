// 28. implement clearAllTimeout()

// Note:
// keep a copy of original setTimeout() method
// override the window.setTimeout() method
// a global variable to store all timers
// JS code:

var timers = [];
var originClearTimeOut = setTimeout;
window.setTimeout = (...args) => {
  var timerId = originClearTimeOut(...args);
  timers.push(timerId);
  return timerId;
};
function clearAllTimeout() {
  // your code here
  timers.forEach((t) => window.clearTimeout(t));
}
