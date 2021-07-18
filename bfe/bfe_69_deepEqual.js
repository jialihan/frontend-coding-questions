// _.isEqual is useful when you want to compare complex data types by value not the reference.

// Can you implement your own version of deep equal isEqual? The lodash version covers a lot of data types. In this problem, you are asked to support :

// 1. primitives
// 2. plain objects (object literals)
// 3. array

// Objects are compared by their own, not inherited, enumerable properties

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
