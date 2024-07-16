// MDN doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
// Case 1: Evaluation result is the same as using ===
Object.is(null, null); // true
Object.is(undefined, undefined); // true

// Case 2: Signed zero
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// Case 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true

function myExpect(input) {
  var neg = false;
  return {
    toBe: (value) => {
      var res = isEqual(input, value);
      if ((!neg && !res) || (neg && res)) {
        throw "not match";
      }
    },
    get not() {
      neg = !neg;
      return this;
    },
  };
}

function isEqual(val1, val2) {
  if (isNaN(val1) && isNaN(val2)) {
    // #1. edge case
    return true;
  }
  if ((val1 === 0 && val2 === -0) || (val1 === -0 && val2 === 0)) {
    // #2. edge case
    return false;
  }
  return val1 === val2;
}
