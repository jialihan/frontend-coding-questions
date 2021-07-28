// Given a string containing only following characters:

// parentheses : ( or )
// brackets: [ or ]
// braces: { or }
// write a function to determine if they are valid.

// By 'valid', it means all should be rightly paired, and with the valid order.

// validate('{}[]()')
// // true

// validate('{[()]}')
// // true

// validate('{[}]')
// // false, they are not in the right order

// validate('{}}')
// // false, last `}` is not paired with `{`
// Follow-up

// What is time & space complexity of your approach ? Can you do it better?

/**
 * @param {string} str
 * @return {boolean}
 */
function validate(str) {
  var map = new Map();
  map.set(")", "(");
  map.set("]", "[");
  map.set("}", "{");
  var q = [];
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    if (c === "[" || c === "{" || c === "(") {
      q.push(c);
    } else {
      if (q.length === 0 || q[q.length - 1] !== map.get(c)) {
        return false;
      }
      q.pop();
    }
  }
  return !!(q.length === 0);
}
