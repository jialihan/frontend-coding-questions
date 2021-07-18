// Promise is widely used nowadays, hard to think how we handled Callback Hell in the old times.

// Can you implement a MyPromise Class by yourself?

// At least it should match following requirements

// 1. new promise: new MyPromise((resolve, reject) => {})
// 2. chaining : MyPromise.prototype.then() then handlers should be called asynchronously
// 3. rejection handler: MyPromise.prototype.catch()
// 4. static methods: MyPromise.resolve(), MyPromise.reject().

// This is a challenging problem. Recommend you read about Promise thoroughly first.
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;
class MyPromise {
  static #resolveHandlers = [];
  static #rejectHandlers = [];
  static #status = PENDING;
  static #result = null;
  constructor(executor) {
    executor(MyPromise.resolve, MyPromise.reject);
  }

  then(onFulfilled, onRejected) {
    if (onFulfilled) {
      if (MyPromise.status === FULFILLED) {
        // already resolved
        onFulfilled(this.result);
      } else {
        MyPromise.resolveHandlers.push(onFulfilled);
      }
    }
    if (onRejected) {
      if (MyPromise.status === REJECTED) {
        // already rejected
        onRejected(this.result);
      } else {
        MyPromise.rejectHandlers.push(onRejected);
      }
    }
    return this; // self chaining
  }

  catch(onRejected) {
    this.then(undefined, onRejected);
    return this; // self chaining
  }

  static resolve(value) {
    MyPromise.#result = value;
    MyPromise.#status = FULFILLED;
    let chainedValue = value;
    MyPromise.#resolveHandlers.forEach((fn) => {
      chainedValue = fn(chainedValue);
    });
    MyPromise.#resolveHandlers = []; // clean up
  }

  static reject(value) {
    this.result = value;
    this.status = REJECTED;
    let chainedValue = value;
    this.rejectHandlers.forEach((fn) => {
      chainedValue = fn(chainedValue);
    });
    this.result = chainedValue;
    this.rejectHandlers = []; // clean up
  }
}
