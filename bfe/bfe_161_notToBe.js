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
    }
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
