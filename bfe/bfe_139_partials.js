// _.partial() works like Function.prototype.bind() but this is not bound.

// please create your own partial()

// const func = (...args) => args

// const func123 = partial(func, 1,2,3)

// func123(4)
// // [1,2,3,4]
// It should also support placeholder.

// const _ = partial.placeholder
// const func1_3 = partial(func, 1, _, 3)

// func1_3(2,4)
// // [1,2,3,4]

function partial(func, ...args) {
  return function (...args2) {
    var newArgs = [];
    args2 = Array.from(args2);
    for (var arg of [...args]) {
      if (arg === partial.placeholder) {
        newArgs.push(args2.shift());
      } else {
        newArgs.push(arg);
      }
    }
    if (args2.length > 0) {
      newArgs.push(...args2);
    }
    return func.call(this, ...newArgs);
  };
}
partial.placeholder = "*";
