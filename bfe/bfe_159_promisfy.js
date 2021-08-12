/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
}
// should handle "this" if needed
// test:
function func(arg1, arg2, arg3, callback) {
  setTimeout(() => {
    callback(null, this.foo);
  }, 50);
}

const obj = {
  foo: "BFE",
  promisified: promisify(func)
};

obj.promisified(1, 2, 3).then((data) => {
  // expect(data).toBe('BFE')
  console.log(data);
});
