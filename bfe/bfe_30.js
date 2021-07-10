// 30. implement async helper - `parallel()`
// https://bigfrontend.dev/problem/implement-async-helper-parallel

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
function parallel(funcs) {
  // your code here
  var count = funcs.length;
  var isError = false;
  var res = [];
  return function (cb) {
    var onComplete = (error, data) => {
      if (isError) {
        return;
      }
      if (error) {
        cb(error, undefined); // call with "undefined", NOT "null"
        isError = true;
        return;
      }
      res.push(data);
      if (--count === 0) {
        cb(error, res);
      }
    };
    funcs.forEach((fn) => {
      fn(onComplete);
    });
  };
}
