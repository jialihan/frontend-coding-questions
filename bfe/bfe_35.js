// 35. implement `Promise.race()`
// https://bigfrontend.dev/problem/implement-Promise-race
// The Promise.race() method returns a promise that fulfills or rejects
// as soon as one of the promises in an iterable fulfills or rejects,
// with the value or reason from that promise

/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
}
