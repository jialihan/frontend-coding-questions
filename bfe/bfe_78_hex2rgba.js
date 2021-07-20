/**
 * @param {string} hex
 * @return {string}
 */
function hexToRgba(hex, opacity = 1) {
  // 1. validate payload
  if (
    (hex.length !== 4 &&
      hex.length !== 7 &&
      hex.length !== 5 &&
      hex.length !== 9) ||
    hex[0] !== "#"
  ) {
    throw "error input hex";
  }
  hex = hex.slice(1);

  // 2. process opacity if any
  var opString;
  if (hex.length === 4) {
    opString = hex[3] + hex[3];
    hex = hex.slice(0, 3);
  } else if (hex.length === 8) {
    opString = hex.slice(6, 8);
    hex = hex.slice(0, 6);
  }
  if (opString) {
    // 2.1 round up result on decimal part
    opacity = String(roundUp(parseInt(opString, 16) / 255));
    var [integer, decimals] = opacity.split(".");
    opacity = integer;
    if (decimals && decimals.length > 2) {
      // 2.2 manually allow 1 or 2 decimal digits instead of using regex
      decimals = decimals.slice(0, 2);
    }
    if (decimals) {
      opacity += "." + decimals;
    }
  }

  // 3. process rgb
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var r = parseInt(hex.slice(0, 2), 16);
  var g = parseInt(hex.slice(2, 4), 16);
  var b = parseInt(hex.slice(4, 6), 16);

  // 4. combine result to rgba(r,g,b,opacity)
  var res = "rgba(" + r + "," + g + "," + b + `,${opacity})`;
  return res;
}
function roundUp(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// console.log(hexToRgba('#fff'));
// console.log(hexToRgba('#0001'));
// console.log(hexToRgba('#1116'));
// console.log(hexToRgba('#ff0c2333'));

// expect(hexToRgba('#ff0c2333')).toBe('rgba(255,12,35,0.2)')
// expect(hexToRgba('#1116')).toBe('rgba(17,17,17,0.4)'
// expect(hexToRgba('#0001')).toBe('rgba(0,0,0,0.07)')

// References:
// - https://www.quackit.com/css/color/values/css_hex_color_notation_4_digits.cfm
// - Roundup method: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
