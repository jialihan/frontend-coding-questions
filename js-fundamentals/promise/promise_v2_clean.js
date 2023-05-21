/**
 * Note: all code is referenced from the original post here: https://juejin.cn/post/7043758954496655397#heading-17
 * Thanks for that blog to explain and clarify Promise/A+ in detail./
 */
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  state = MyPromise.PENDING; // set default state
  result = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  constructor(func) {
    if (typeof func !== "function") {
      throw "param must be a function!";
    }
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e); //注意这里不需要给reject()方法进行this的绑定了，因为这里是直接执行，而不是创建实例后再执行。
    }
  }

  resolve(res) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED;
      this.result = res;
      this.onFulfilledCallbacks.forEach((callback) => {
        setTimeout(() => {
          callback(res);
        });
      });
    }
  }

  reject(reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED;
      this.result = reason;
      this.onRejectedCallbacks.forEach((callback) => {
        setTimeout(() => {
          callback(reason);
        });
      });
    }
  }

  then(onFulfilled, onRejected) {
    // 2.2.7 then must return a promise
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== "function") {
                // 2.2.7.3 If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
                resolve(this.result);
              } else {
                // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x)
                const x = onFulfilled(this.result);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== "function") {
                // 2.2.7.4 If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
                reject(this.result);
              } else {
                // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x)
                const x = onRejected(this.result);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
              reject(e);
            }
          });
        });
      }

      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              // 2.2.7.3 If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
              resolve(this.result);
            } else {
              // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x)
              const x = onFulfilled(this.result);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
            reject(e);
          }
        });
      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              // 2.2.7.4 If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
              reject(this.result);
            } else {
              // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x)
              const x = onRejected(this.result);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
            reject(e);
          }
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }

  // only for npm testing: https://github.com/promises-aplus/promises-tests
  static deferred() {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
      result.resolve = resolve;
      result.reject = reject;
    });
    return result;
  }
}

/**
 *  2.3. The Promise Resolution Procedure
 * @param {MyPromise} promise2 - returned promise object from the promise1's then() method
 * @param {*} x - result returned from onFulfilled / onRejected's value
 * @param {*} resolve - function passed to promise2
 * @param {*} reject - function passed to promise2
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (promise2 === x) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  if (x instanceof MyPromise) {
    x.then((y) => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  }
  // 2.3.3 Otherwise, if x is an object or function,
  else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let then;
    try {
      // 2.3.3.1 Let then be x.then
      then = x.then; // note: var can be accessed outside of try block
    } catch (e) {
      // 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
      reject(e); // why need to return here??? - don't need
    }

    // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
    let called = false;

    if (typeof then === "function") {
      try {
        // 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true;
            // 2.3.3.3.1 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            // 2.3.3.3.2 If/when rejectPromise is called with a reason r, reject promise with r
            reject(r);
          }
        );
      } catch (e) {
        // 2.3.3.3.4 If calling then throws an exception e
        if (called) {
          // 2.3.3.3.4.1 If resolvePromise or rejectPromise have been called, ignore it.
          return;
        }
        called = true;
        // 2.3.3.3.4.2 Otherwise, reject promise with e as the reason.
        reject(e);
      }
    } else {
      // 2.3.3.4 If then is not a function, fulfill promise with x.
      resolve(x);
    }
  } else {
    // 2.3.4 If x is not an object or function, fulfill promise with x
    resolve(x);
  }
}

module.exports = MyPromise; // why use commonJS module export
