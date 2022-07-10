/**
 * @param {string} str
 * @returns {boolean}
 */

// (group1)?    (group2|group3)     (group4)?
// group1:  [\+|-]?
// group2: ([0-9]|[1-9][0-9]+)(\.[0-9]*)?
// group3: \.[0-9]+
// group4: [\+|-]?[e|E][-|\+]?([0-9]|[1-9][0-9]+)

function validateNumberString(str) {
  if (!str) {
    return false;
  }
  // your code here
  let pattern =
    /^[\+|-]?((([0-9]|[1-9][0-9]+)(\.[0-9]*)?)|(\.[0-9]+))([\+|-]?[e|E][-|\+]?([0-9]|[1-9][0-9]+))?$/;
  return pattern.test(str);
}

// console.log(validateNumberString('1.0'));
// console.log(validateNumberString('-2.335'));
// console.log(validateNumberString('-12.3e45'));
// console.log(validateNumberString('1e+0'));
// console.log(validateNumberString('.3'));
// console.log(validateNumberString('100.'));
// console.log(validateNumberString('-.3'));
// console.log(validateNumberString('100.'));
// console.log(validateNumberString('-100.'));
// // console.log(validateNumberString('e3'));
// console.log(validateNumberString('12222E0'));

// console.log(validateNumberString('0+')); // false
// console.log(validateNumberString('+')); // false
// console.log(validateNumberString('.')); // false
// console.log(validateNumberString('++1')); // false
// console.log(validateNumberString('')); // false
// console.log(validateNumberString('e3')); // false
