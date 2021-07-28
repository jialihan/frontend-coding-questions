/**
 * @param {number} base
 * @param {number} power - integer
 * @return {number}
 */
function pow(base, power) {
  if (power < 0) {
    return 1 / pow(base, -power);
  }
  if (power === 0) {
    return 1;
  }
  if (power === 1) {
    return base;
  }
  var half = pow(base, Math.floor(power / 2));
  if (power % 2 === 1) {
    return half * half * base;
  }
  return half * half;
}
console.log(pow(2, 10));
