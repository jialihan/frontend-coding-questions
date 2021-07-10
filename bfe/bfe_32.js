// 32. implement `Promise.all()`
// https://bigfrontend.dev/problem/implement-Promise-all

// Note: since i write in ES5 for convenience,
// there is a BUG if we use "var" in "for loop" in async code,
// the value of "var i" will NOT be persisted when the async code exec.
// Use "let" to persist the reference value of variable i.

// Code:

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  if (!promises.length) {
    return Promise.resolve([]);
  }
  var n = promises.length;
  var res = [];
  return new Promise((resolve, reject) => {
    for (
      let i = 0;
      i < promises.length;
      i++ // use let it's {} scoped, "var" in async code will cause error
    ) {
      Promise.resolve(promises[i])
        .then((resp) => {
          n--;
          res[i] = resp;
          if (n === 0) {
            resolve(res);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
}
