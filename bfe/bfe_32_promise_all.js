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

/**
 * Version 2
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  if (iterable.length == 0) {
    return Promise.resolve([]);
  }
  const res = [];
  const n = iterable.length;
  let count = n;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < n; i++) {
      Promise.resolve(iterable[i]).then(
        (resp) => {
          res[i] = resp;
          count--;
          if (count === 0) {
            resolve(res);
          }
        },
        (err) => {
          reject(err);
        },
      );
    } // end for
  });
}
