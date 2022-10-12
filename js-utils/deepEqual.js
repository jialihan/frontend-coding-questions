/**
 * Check if two items are deep equal object
 * params can be any type
 *
 * @param {any} x
 * @param {any} y
 */
// // WRONG: cycle bug in recursion
// function deepEqual(x, y) {
//   if (x === y) {
//     return true;
//   } else if (
//     typeof x === "object" &&
//     x !== null &&
//     typeof y === "object" &&
//     y !== null
//   ) {
//     if (Object.keys(x).length !== Object.keys(y).length) {
//       return false;
//     }
//     for (let key of Object.keys(x)) {
//       if (y.hasOwnProperty(key)) {
//         if (!deepEqual(x[key], y[key])) {
//           return false;
//         }
//       } else {
//         return false;
//       }
//     }
//     return true;
//   } else {
//     return false;
//   }
// }

// tests
const a = { name: "jel", age: 18 };
const b = { name: "jel", age: 17 };
console.log(deepEqual(a, b)); // false
console.log(deepEqual(undefined, a)); // false
console.log(deepEqual(null, undefined)); // false
console.log(deepEqual(undefined, a)); // false
console.log(deepEqual(null, null)); // true

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b, visited = new Set()) {
  if (a === b) {
    return true;
  }
  if (visited.has(a) && visited.has(b)) {
    return true;
  }
  visited.add(a);
  visited.add(b);
  if (
    typeof a === "object" &&
    a !== null &&
    typeof b === "object" &&
    b !== null
  ) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (let key of Object.keys(a)) {
      if (b.hasOwnProperty(key)) {
        if (!isEqual(a[key], b[key], visited)) {
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
// Bug: should support circular refernce in objects(example case)
const a = {};
a.self = a;
// const b = {self: a}
const c = {};
c.self = c;
// const d = {self: {self: a}}
// const e = {self: {self: b}}
console.log(isEqual(a, c));
// console.log(isEqual(d,e));
// expect(isEqual(a, b)).toBe(true)
// expect(isEqual(a, c)).toBe(true)
// expect(isEqual(a, d)).toBe(true)
// expect(isEqual(a, e)).toBe(true)
// expect(isEqual(b, c)).toBe(true)
// expect(isEqual(b, d)).toBe(true)
// expect(isEqual(e, e)).toBe(true)
// expect(isEqual(c, d)).toBe(true)
// expect(isEqual(c, e)).toBe(true)
// expect(isEqual(d, e)).toBe(true)
