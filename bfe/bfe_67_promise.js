// Promise is widely used nowadays, hard to think how we handled Callback Hell in the old times.

// Can you implement a MyPromise Class by yourself?

// At least it should match following requirements

// 1. new promise: new MyPromise((resolve, reject) => {})
// 2. chaining : MyPromise.prototype.then() then handlers should be called asynchronously
// 3. rejection handler: MyPromise.prototype.catch()
// 4. static methods: MyPromise.resolve(), MyPromise.reject().

// This is a challenging problem. Recommend you read about Promise thoroughly first.
// Version 2 with returning a new promise object
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;
class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.resolveHandlers = [];
    this.rejectHandlers = [];
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);
    setTimeout(() => {
      try {
        executor(this.onResolve, this.onReject);
      } catch (e) {
        this.onReject(e);
      }
    }, 0);
  }

  then(onFulfilled, onRejected) {
    if (onFulfilled) {
      if (this.status === FULFILLED) {
        // already resolved
        return Promise.resolve(onFulfilled(this.result));
      } else {
        this.resolveHandlers.push(onFulfilled);
        return new Promise(() => {});
      }
    }
    if (onRejected) {
      if (this.status === REJECTED) {
        // already rejected
        return Promise.reject(onRejected(this.result));
      } else {
        this.rejectHandlers.push(onRejected);
        return new Promise(undefined, () => {});
      }
    }
    // return new MyPromise((resolve, reject)=>{
    //     if (onFulfilled) {
    //         if (this.status === FULFILLED) {
    //           // already resolved
    //           resolve(onFulfilled(this.result));
    //         } else {
    //           this.resolveHandlers.push(onFulfilled);
    //         }
    //     }
    //       if (onRejected) {
    //         if (this.status === REJECTED) {
    //           // already rejected
    //           reject(onRejected(this.result));
    //         } else {
    //           this.rejectHandlers.push(onRejected);
    //         }
    //       }
    // });
    // return this; // self chaining
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  onResolve(value) {
    if (this.result === FULFILLED) {
      return;
    }
    this.result = value;
    this.status = FULFILLED;
    let chainedValue = value;
    try {
      this.resolveHandlers.forEach((fn) => {
        chainedValue = fn(chainedValue);
      });
      // this.result = chainedValue;
      return chainedValue;
    } catch (err) {
      this.resolveHandlers = []; // clean up
      this.onReject(err);
    }
  }
  onReject(value) {
    this.result = value;
    this.status = REJECTED;
    let chainedValue = value;
    this.rejectHandlers.forEach((fn) => {
      chainedValue = fn(chainedValue);
    });
    // this.result = chainedValue;
    this.rejectHandlers = []; // clean up
    return chainedValue;
  }
  static resolve(value) {
    return new MyPromise((rel) => rel(value));
  }
  static reject(value) {
    return new MyPromise((rel, rej) => rej(value));
  }
}

// const mp = new MyPromise(() => {})
// const newmp = mp.then(() => {})

// Bug1: promise can only be resolve once
// const spy = jasmine.createSpy()
const mp = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
    setTimeout(() => {
      resolve(2);
    }, 10);
  }, 10);
}).then((data) => {
  //   spy(data)
  console.log(data);
});

// // BUG2: constructor should be sync, then handlers should be async spec  , expects [0,1,4,2,3] but gets [0,4,1,2,3]
// const order = []
// order.push(0)
// const mp = new MyPromise((resolve, reject) => {
//   order.push(1)
//   resolve(1)
// })
// mp.then(() => {
//   order.push(2)
// })
// .then((data) => {
// order.push(3)
// })
// order.push(4)

// setTimeout(() => {
//   expect(order).toEqual([0,1,4,2,3])
//   done()
// }, 50)

// // BUG3: then(callback) return a promise chained to the promise(fulfilled) from callback spec  , (diff is too big, full diff )
// // eRROR RESULT:=
// // EXPECTED
// // 2
// // Actual
// // {status:1,resolveHandlers:[],rejectHandlers:[],onResolve:function bound onResolve(){...},onReject:function bound onReject(){...},result:2}

// const mp = new MyPromise((resolve, reject) => { resolve(1)})
// const spy2 = jasmine.createSpy()
// const mp2 = new MyPromise((resolve, reject) => {
//   spy2()
//   resolve(2)
// })
// mp.then((data) => {
//   return mp2
// }).then((data) => {
//   expect(data).toBe(2)
//   expect(spy2).toHaveBeenCalled()
//   done()
// }, (error) => {
//   const spy = jasmine.createSpy()
//   spy()
//   expect(spy).not.toHaveBeenCalled()
//   done()
// })

// setTimeout(() => {
//   expect(spy.calls.allArgs()).toEqual([[1]])
//   done()
// }, 100)

// MyPromise.resolve(1)
// .then((val) => {
//   console.log(val)
//   return val + 1
// })
// .then((val) => {
//   console.log(val)
// }).then((val) => {
//   console.log(val)
//   return MyPromise.resolve(3)
//     .then((val) => {
//       console.log(val)
//     })
// }).then((val) => {
//   console.log(val)
//   return MyPromise.reject(4)
// }).catch((val) => {
//   console.log(val)
// })
