// This is a JavaScript Quiz from BFE.dev

console.log(typeof null); // "object"
console.log(null instanceof Object); // false, null is a primitive
console.log(typeof 1); // "number"
console.log(1 instanceof Number); // false, number is a primitive
console.log(1 instanceof Object); // false, number is a primitive
console.log(Number(1) instanceof Object); // false, number is a primitive
console.log(new Number(1) instanceof Object); // true, number Object using "new"
console.log(typeof true); // "boolean"
console.log(true instanceof Boolean); // false, primitive
console.log(true instanceof Object); // false primitive
console.log(Boolean(true) instanceof Object); // false, primitive
console.log(new Boolean(true) instanceof Object); // true, boolean object using "new"
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log((() => {}) instanceof Object); // true
