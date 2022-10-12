// This is a JavaScript Quiz from BFE.dev

console.log(["0"].map(parseInt)); // parseInt('0', 0) => [0]
console.log(["0", "1"].map(parseInt)); // parseInt('0', 0), parseInt('1', 1) => [0, NaN]
console.log(["0", "1", "1"].map(parseInt)); // parseInt('0', 0), parseInt('1', 1), parseInt('1', 2) => [0, NaN, 1]
console.log(["0", "1", "1", "1"].map(parseInt)); // parseInt('0', 0), parseInt('1', 1), parseInt('1', 2) => [0, NaN, 1]

// 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// callbackFn is invoked with three arguments: the value of the element, the index of the element, and the array object being mapped.

// 2. radix >= 2

// 3. special case radix = 0, the string provided here default to use 10 based integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#description//
// If it's unprovided, or if the value becomes 0, NaN or Infinity (undefined is coerced to NaN), JavaScript assumes the following:
//     * If the input string, with leading whitespace and possible +/- signs removed, begins with 0x or 0X (a zero, followed by lowercase or uppercase X), radix is assumed to be 16 and the rest of the string is parsed as a hexadecimal number.
//     * If the input string begins with any other value, the radix is 10 (decimal).
