// 31. implement async helper - `race()`
// Your race() should accept AsyncFunc array,
// and return a new function which triggers its own callback when any async function is done or an error occurs.
// https://bigfrontend.dev/problem/implement-async-helper-race

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function race(funcs) {
  var isDone = false;
  return function (cb) {
    var onComplete = (error, data) => {
      if (!isDone) {
        cb(error, data); // ONLY call with Current error & data
        isDone = true;
        return;
      }
    };
    funcs.forEach((fn) => {
      fn(onComplete);
    });
  };
}
