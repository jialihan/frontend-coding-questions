// 54. flatten Thunk
// https://bigfrontend.dev/problem/flatten-Thunk

// Like following three thunks:

// const func1 = (cb) => {
//   setTimeout(() => cb(null, 'ok'), 10)
// }

// const func2 = (cb) => {
//   setTimeout(() => cb(null, func1), 10)
// }

// const func3 = (cb) => {
//   setTimeout(() => cb(null, func2), 10)
// }
// in above example, three functions are kind of chained up, func3 → func2 → func1, but it don't work without some glue.

// OK, now you are asked to implement a flattenThunk() which glue them up and returns a new thunk.

// flattenThunk(func3)((error, data) => {
//    console.log(data) // 'ok'
// })
// note

// Once error occurs, the rest uncalled functions should be skipped

/**
 * @param {Thunk} thunk
 * @return {Thunk}
 */
function flattenThunk(thunk) {
  return function (cb) {
    var nextThunk = (error, data) => {
      if (error) {
        cb(error, undefined); // due to test case here, NOT use "null"
      } else if (typeof data === "function") {
        data(nextThunk);
      } else {
        // exec callback with the final data
        cb(error, data);
      }
    };
    thunk(nextThunk);
  };
}
