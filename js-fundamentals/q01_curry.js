// Question link: https://bigfrontend.dev/problem/implement-curry
// const join = (a, b, c) => {
//     return `${a}_${b}_${c}`
//  }

//  const curriedJoin = curry(join)

//  curriedJoin(1, 2, 3) // '1_2_3'

//  curriedJoin(1)(2, 3) // '1_2_3'

//  curriedJoin(1, 2)(3) // '1_2_3'

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...args2) => curried(...args, ...args2);
  };
}
// Optimize: when using this
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// Testing with "this:"
function join(a, b, c) {
  console.log(this.name);
  return `${a}_${b}_${c}`;
}

const curriedJoin = curry(join);
const alice = {
  name: "alice",
};
const bob = {
  name: "bob",
};
curriedJoin.call(alice, 1, 2).call(bob, 4, 5); // Result is "Bob"

// !!! Wrong example:
function curry_wrong(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // this
    return (...args2) => {
      // WRONG: "this" points to the 1st time who calls the "curried" function
      // curriedJoin.call(alice, 1, 2).call(bob, 4, 5); // Result is "Alice"
      return curried.apply(this, args.concat(args2));
    };
  };
}
// NOTE: function.length
// mdn doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
// the original parameter length of the function statement
