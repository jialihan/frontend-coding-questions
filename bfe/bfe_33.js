// 33. implement `Promise.allSettled()`
// https://bigfrontend.dev/problem/implement-Promise-allSettled
// Reference:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // your code here
  if (!promises.length) {
    return Promise.resolve([]);
  }
  var n = promises.length;
  var res = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((resp) => {
          res[i] = { status: "fulfilled", value: resp };
          if (--n === 0) {
            resolve(res);
          }
        })
        .catch((e) => {
          res[i] = { status: "rejected", reason: e };
          if (--n === 0) {
            resolve(res);
          }
        });
    }
  });
}
