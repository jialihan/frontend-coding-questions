/**
 * Check if two items are deep equal object
 * params can be any type
 *
 * @param {any} x
 * @param {any} y
 */
function deepEqual(x, y) {
  if (x === y) {
    return true;
  } else if (
    typeof x === "object" &&
    x !== null &&
    typeof y === "object" &&
    y !== null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }
    for (let key of Object.keys(x)) {
      if (y.hasOwnProperty(key)) {
        if (!deepEqual(x[key], y[key])) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// tests
const a = { name: "jel", age: 18 };
const b = { name: "jel", age: 17 };
console.log(deepEqual(a, b)); // false
console.log(deepEqual(undefined, a)); // false
console.log(deepEqual(null, undefined)); // false
console.log(deepEqual(undefined, a)); // false
console.log(deepEqual(null, null)); // true
