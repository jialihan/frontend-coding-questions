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

// NOTE: function.length
// the original parameter length of the function statement
