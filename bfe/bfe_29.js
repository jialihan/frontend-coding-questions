// 29. implement async helper - `sequence()`
// Your sequence() should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.

// Suppose we have an async func which just multiple a number by 2

// const asyncTimes2 = (callback, num) => {
//    setTimeout(() => callback(null, num * 2), 100)
// }
// Your sequence() should be able to accomplish this

// const asyncTimes4 = sequence(
//   [
//     asyncTimes2,
//     asyncTimes2
//   ]
// )

// asyncTimes4((error, data) => {
//    console.log(data) // 4
// }, 1)
// Once an error occurs, it should trigger the last callback without triggering the uncalled functions.

// Follow up

// Can you solve it with and without Promise?
/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
  return function (cb, data) {
    var [firstFn, ...restFns] = funcs;
    var resp = data;
    var runNext = (error, dt) => {
      if (error) {
        cb(error, null);
        return;
      }
      resp = dt;
      if (restFns.length === 0) {
        // if it's the last func
        cb(error, resp);
        return;
      }
      var curFn = restFns.shift();
      curFn(runNext, resp);
    };
    firstFn(runNext, resp);
  };
}
