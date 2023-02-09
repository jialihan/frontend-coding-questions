function instanceOf(left, right) {
  let proto = left.__proto__;
  const prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__; // trace way up along the prototype chain
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
// MDN: The instanceof operator tests to see if the prototype property of a constructor
// appears anywhere in the prototype chain of an object.

console.log(Function instanceof Object); // true
console.log(Object instanceof Function); // true

// https://stackoverflow.com/questions/23622695/why-in-javascript-both-object-instanceof-function-and-function-instanceof-obj

// 1. Object is a function and thus is an instance of Function (an instance of the Function constructor)
// Object ---> Function.prototype ---> Object.prototype ---> null
// 2. Function is an instance of itself (naturally, since it’s a function, and thus an instance of Function)
// Function ---> Function.prototype ---> Object.prototype ---> null
