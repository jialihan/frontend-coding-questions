// // Rules
// 1. string and number are used directly.
// classNames('BFE', 'dev', 100)
// // 'BFE dev 100'
// 2. other primitives are ignored.
// classNames(
//   null, undefined, Symbol(), 1n, true, false
// )
// // ''
//3.  Object's enumerable property keys are kept if the key is string and value is truthy.
// Array should be flattened.

/**
 * @param {any[]} args
 * @returns {string}
 */
function classNames(...args) {
  var res = [];
  for (var arg of [...args]) {
    if (typeof arg === "string" || typeof arg === "number") {
      res.push(arg);
    } else if (typeof arg === "object") {
      if (arg === null) {
        continue;
      } else if (Array.isArray(arg)) {
        // arg = arg.flat(Infinity);
        res.push(classNames(...arg)); // TODO: array not flatten here
      } else {
        for (var [key, value] of Object.entries(arg)) {
          if (!!value) {
            res.push(key);
          }
        }
      }
    } else {
      continue;
    }
  }
  return res.join(" ");
}

function classNames(...args) {
  var arr = args.flat(Infinity);
  var res = [];
  for (var item of arr) {
    if (typeof item === "string" || typeof item === "number") {
      res.push(item);
    } else if (typeof item === "object") {
      if (item === null) {
        continue;
      }
      for (var [key, value] of Object.entries(item)) {
        if (!!value) {
          res.push(key);
        }
      }
    } else {
      continue;
    }
  }
  return res.join(" ");
}
