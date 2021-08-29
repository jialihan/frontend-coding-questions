// https://bigfrontend.dev/problem/implement-curry-with-placeholder

// const  join = (a, b, c) => {
//     return `${a}_${b}_${c}`
//  }

//  const curriedJoin = curry(join)
//  const _ = curry.placeholder

//  curriedJoin(1, 2, 3) // '1_2_3'

//  curriedJoin(_, 2)(1, 3) // '1_2_3'

//  curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

// Steps:
// 1. next call params will take turns to replace previous placeholder, eg: when you call with (_, 3 ,4) at first, then next call with (1,2), replace '_' with 1,
// 2. then merge remaining args in the next calls, eg: remaining is 2, then merge it, final args are (1,3,4,2)
// 3. when longer params and NO placeholders, directly return the fn(...args)
function curry(fn) {
  return function curried(...args) {
    const newArgs = args.slice(0, fn.length);
    if (args.length >= fn.length && newArgs.indexOf(curry.placeholder) === -1) {
      // if enough length && no placeholder, just call the function
      return fn(...args);
    }
    return (...args2) => {
      var updatedArgs = args.map((el) => {
        if (el === curry.placeholder && args2.length > 0) {
          return args2.shift();
        }
        return el;
      });
      return curried.apply(null, updatedArgs.concat(args2));
    };
  };
}
curry.placeholder = Symbol();
