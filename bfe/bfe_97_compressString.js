// Given a string, compress the repeating letters with count number

// compress('a') // 'a'
// compress('aa') // 'a2'
// compress('aaa') // 'a3'
// compress('aaab') // 'a3b'
// compress('aaabb') // 'a3b2'
// compress('aaabba') // 'a3b2a'

/**
 * @param {string} str
 * @return {string}
 */
function compress(str) {
  var count = 1;
  var res = "";
  for (var i = 1; i <= str.length; i++) {
    if (i === str.length || str[i] !== str[i - 1]) {
      res += str[i - 1] + (count > 1 ? count : "");
      count = 1;
    } else {
      count++;
    }
  }
  return res;
}
