// // https://github.com/lahmatiy/es6-promise-polyfill/blob/master/promise.js
// https://github.com/taylorhakes/promise-polyfill/blob/master/src/finally.js

// Promise  // 构造函数
// Promise.prototype.then
// Promise.prototype.catch
// Promise.prototype.finally

// // 静态方法
// Promise.resolve
// Promise.reject
// Promise.race
// Promise.all

// state
// _state === 0  // pending，当前 Promise 正在执行中
// _state === 1  // fulfilled, 表示执行了 `resolve` 函数，并且 `_value` instanceof Promise === true
// _state === 2  // rejected, 表示执行了`reject` 函数
// _state === 3  // fulfilled, 执行了 `resolve 函数，并且_value instanceof Promise === false
// function noop() {}
class MyPromise {
  constructor(executor) {
    if (!(this instanceof MyPromise)) {
      throw "Promise must be contructed with new!";
    }
    if (typeof executor !== "function") {
      throw "param must be a function!";
    }
    this.state = 0; // 0 pending 1 resolve
    this.deferred = [];
    this.value = undefined;

    // call sync
    this.doResolve(executor);
  }
  doResolve(fn) {
    let done = false;
    try {
      fn(
        (result) => {
          if (done) {
            return;
          }
          done = true;
          try {
            this.resolve(result);
          } catch (e) {
            this.reject(e);
          }
        },
        (error) => {
          if (done) {
            return;
          }
          done = true;
          this.reject(error);
        }
      );
    } catch (error) {
      if (done) {
        return;
      }
      done = true;
      this.reject(error);
    }
  }
  resolve(newValue) {
    if (this === newValue) {
      throw "a promise cannot resolve itself!";
    }
    // 1) other compatible promise implementation, eg: Nodejs's promise, can be thenable
    if (
      newValue &&
      (typeof newValue === "object" || typeof newValue === "function")
    ) {
      if (typeof newValue.then === "function") {
        let then = newValue.then;
        this.doResolve(then.bind(newValue));
        return;
      }
    }
    // 2) normal newValue to resolve
    this.state = 1;
    this.value = newValue;
    this.finale();
  }

  reject(newValue) {
    this.state = 2;
    this.value = newValue;
    this.finale();
  }
  finale() {
    setTimeout(() => {
      this.deferred.forEach((h) => {
        if (this.state === 1) {
          h.onFulfilled(this.value);
        } else if (this.state === 2) {
          h.onRejected(this.value);
        }
      });
      this.deferred = [];
    }, 0);
  }

  handle(onFulfilled, onRejected) {
    if (this.state === 0) {
      // 1) if pending, no exect, just queue it and return
      this.deferred.push({ onFulfilled, onRejected });
      return;
    }
    setTimeout(() => {
      if (this.state === 1) {
        // 2) resolved
        if (typeof onFulfilled === "function") {
          onFulfilled(this.value);
        }
      }
      if (this.state === 2) {
        // 3) rejected
        if (typeof onRejected === "function") {
          onRejected(this.value);
        }
      }
    }, 0);
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.handle(
        (result) => {
          if (typeof onFulfilled === "function") {
            try {
              return resolve(onFulfilled(result));
            } catch (e) {
              return reject(e);
            }
          }
          resolve(result);
        },
        (error) => {
          if (typeof onRejected === "function") {
            try {
              return resolve(onRejected(error));
            } catch (e) {
              return reject(e);
            }
          }
          reject(error);
        }
      );
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    // If the value is a promise, that promise is returned;
    if (value && typeof value === "object" && value.constructor === MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise(function (resolve, reject) {
      reject(value);
    });
  }
}

const pro = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
});
const pro1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
}); // 执行耗时1s 的异步任务

// pro
//   .then(() => pro1)
//   .then(
//     (data) => console.log(data)
//     // (err) => console.log(err)
//   )
//   .catch((err) => {
//     console.log(err);
//   });
// // 输出结果: 正常打印了100，

pro.then(4).catch((err) => {
  console.log(err);
});

var test = Promise.resolve(2).then(4);

var finallyTest = MyPromise.resolve(1).finally(() => {
  throw "error in finally";
  return 2;
});
