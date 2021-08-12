// Symbol	I	V	X	L	C	D	M
// Value	1	5	10	50	100	500	1000
// For Standard form, subtractive notation is used, meaning 4 is IV rather than IIII, 9 is IX rather than VIIII. Same rule applies to 40(XL) and 900(CM) .etc.

// Simply speaking, the roman numerals in standard form follow these rules.

// symbols are listed from highest to lowest, from left to right
// from left to right, if the next symbol value is bigger than current one, it means subtracting, otherwise adding.
// Please implement romanToInteger(). The input are all valid strings.

// romanToInteger('CXXIII')
// // 123

// romanToInteger('MCMXCIX')
// // 1999

// romanToInteger('MMMCDXX')
// // 3420

/**
 * @param {string} str - roman numeral string
 * @returns {number} integer
 */
function romanToInteger(str) {
  var map = new Map();
  map.set("I", 1);
  map.set("V", 5);
  map.set("X", 10);
  map.set("L", 50);
  map.set("C", 100);
  map.set("D", 500);
  map.set("M", 1000);
  var arr = [...str].map((el) => map.get(el));
  var n = arr.length;
  var res = arr[n - 1];
  for (var i = n - 1; i > 0; i--) {
    if (arr[i] <= arr[i - 1]) {
      res += arr[i - 1];
    } else {
      res -= arr[i - 1];
    }
  }
  return res;
}
