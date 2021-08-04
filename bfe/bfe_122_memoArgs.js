// You might need to restrict the cache capacity, just like memoize-one , it only remembers the latest arguments and result.

// Please implement your own memoizeOne(), it takes 2 arguments

// target function
// (optional) a equality check function to compare current and last arguments

// https://github.com/alexreardon/memoize-one

/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */
function defaultIsEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function defaultIsEqual(curr, prev = []) {
  if (curr.length !== prev.length) return false;
  return curr.every((ele, i) => ele === prev[i]);
}
function memoizeOne(func, isEqual = defaultIsEqual) {
  let lastResult = null;
  let lastArghs = [];
  let lastThis = null;

  return function (...args) {
    if (lastThis === this && isEqual(lastArghs, [...args])) {
      return lastResult;
    }
    lastResult = func.apply(this, args);
    lastArghs = args;
    lastThis = this;
    return lastResult;
  };
}
/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */
function defaultIsEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function defaultIsEqual(curr, prev = []) {
  if (curr.length !== prev.length) return false;
  return curr.every((ele, i) => ele === prev[i]);
}
function memoizeOne(func, isEqual = defaultIsEqual) {
  let lastResult = null;
  let lastArghs = [];
  let lastThis = null;

  return function (...args) {
    if (lastThis === this && isEqual(lastArghs, [...args])) {
      return lastResult;
    }
    lastResult = func.apply(this, args);
    lastArghs = args;
    lastThis = this;
    return lastResult;
  };
}
