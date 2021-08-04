// 123. implement Promise.prototype.finally()

/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
// async function myFinally(promise, onFinally) {
//   try {
//     const fulfilledValue = await promise;
//     await onFinally();
//     return fulfilledValue;
//   } catch (rejectedValue) {
//     await onFinally();
//     throw rejectedValue;
//   }
// }

// // test await value of a promise object

// async function awaitPromise() {
//   // var mypromise = Promise.resolve(2);
//   var mypromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2);
//     }, 2000);
//   });
//   try {
//     var resp = await mypromise;
//     console.log(resp); // 2, not a promise object
//   } catch (e) {
//     console.log(e);
//   }
// }
// awaitPromise();

function myFinally(promise, onFinally) {
  return promise
    .then((val) => {
      return Promise.resolve(onFinally()).then(() => val);
    })
    .catch((err) => {
      return Promise.resolve(onFinally()).then(() => Promise.rejct(err));
      // if reject or throw error in "onFinally()", it wins, so that then() never exec
      // 1. because a promise can be reject only once
      // 2. throw an error, promise gets rejected automatiaclly
    });
}
// test: throw error in finally
// var mypromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("original reject reason");
//   }, 2000);
// });
var finallyFn = () => {
  throw "error in finally";
};
// // console.log(myFinally(mypromise, finallyFn));
// console.log(mypromise.finally(() => finallyFn()));

// var obj = Promise.resolve(() => {
//   throw "error in resolve value";
// });

// console.log(obj);

// var obj = Promise.resolve(2);
// console.log(obj.finally(() => finallyFn())); // error will Reject the obj finally

var finallyFn = () => Promise.reject("finally reject reason");
var obj2 = Promise.reject("origin reject reason").finally(() => finallyFn());
console.log(obj2); // reject with "finally reject reason"

var obj3 = new Promise((resolve, reject) => {
  reject(1);
  reject(2);
  reject(3);
});
console.log(obj3); // reject with "1"
