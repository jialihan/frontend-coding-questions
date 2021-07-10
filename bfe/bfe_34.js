// 34. implement `Promise.any()`
// Promise.any() takes an iterable of Promise objects and,
// as soon as one of the promises in the iterable fulfils,
// returns a single promise that resolves with the value
// from that promise

// Bug: store the error result in order with index i, cannot use "push()" method.

/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    let n = promises.length;
    let errors = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve).catch((e) => {
        // errors.push(e); // BUG
        errors[i] = e;
        if (--n === 0) {
          reject(
            new AggregateError("No Promise in Promise.any was resolved", errors)
          );
        }
      }); // end catch
    } // end for
  }); // end new Promise
}
