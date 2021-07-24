// 1. toString() solution
// reference: https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript

/**
 * @param {number} num - integer
 * @return {number} count of 1 bit
 */
function countOne(num) {
  let str = num.toString(2),
    count = 0;
  for (let s of str) {
    if (s === "1") {
      count++;
    }
  }
  return count;
}
// 2. Bit manipulation
function countOne(num) {
  let count = 0;
  while (num) {
    if (num & (1 === 1)) {
      count++;
    }
    num = num >> 1;
    // or
    // num = Math.floor(num / 2);
  }
  return count;
}
