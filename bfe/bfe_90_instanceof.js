/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */
function myInstanceOf(obj, target) {
  if (typeof target !== "function") {
    throw "target is not callable"; // from test case
  }
  if (!obj || typeof obj !== "object") {
    return false;
  }
  var proto = obj.__proto__;
  while (proto) {
    if (proto === target.prototype) {
      return true;
    }
    proto = proto.__proto__ ?? null;
  }
  return false;
}
// class A {}
// class B extends A {}

// const b = new B()
// console.log(myInstanceOf(b, B)); // true
// console.log(myInstanceOf(b, A)); // true
// console.log(myInstanceOf(b, Object)); // true

// function C() {}
// console.log(myInstanceOf(b, C)); // false
// C.prototype = B.prototype
// console.log(myInstanceOf(b, C)); // true
// C.prototype = {}
// console.log(myInstanceOf(b, C)); // false
