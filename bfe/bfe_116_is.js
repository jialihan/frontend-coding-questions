// - How to check `+0` and `-0` ?
//  https://stackoverflow.com/questions/7223359/are-0-and-0-the-same
// - SPEC: https://262.ecma-international.org/6.0/#sec-samevalue

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  // If Type(x) is different from Type(y), return false.
  if (typeof a !== typeof b) {
    return false;
  }
  // If Type(x) is Undefined, return true.
  // If Type(x) is Null, return true.
  if (a === undefined || a === null) {
    return true;
  }
  // If Type(x) is Number, then
  // - If x is NaN and y is NaN, return true.
  // - If x is +0 and y is −0, return false.
  // - If x is −0 and y is +0, return false.
  // - If x is the same Number value as y, return true.
  // - Return false.
  if (typeof a === "number") {
    if (isNaN(a) && isNaN(b)) {
      return true;
    }
    if (
      (isPositiveZero(a) && isMinusZero(b)) ||
      (isMinusZero(a) && isPositiveZero(b))
    ) {
      return false;
    }
    if (+a == +b) {
      return true;
    }
    return false;
  }
  return a === b;
}
function isMinusZero(value) {
  return 1 / value === -Infinity;
}
function isPositiveZero(value) {
  return 1 / value === Infinity;
}
