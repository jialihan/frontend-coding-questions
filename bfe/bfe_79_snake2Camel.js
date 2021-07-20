/**
 * @param {string} str
 * @return {string}
 */
function snakeToCamel(str) {
  var n = str.length;
  var isCamel = false;
  var res = "";
  var i = 0;
  while (i < n) {
    if (str[i] === "_") {
      if (i > 0 && str[i - 1] === "_") {
        res += isCamel ? "__" : "_"; // edge case: leading "__aaaaa"
        isCamel = false;
      } else if (i !== 0 && i !== n - 1) {
        isCamel = true;
      } else {
        res += "_";
        isCamel = false;
      }
    } else {
      var cur = str[i];
      if (isCamel) {
        cur = String.prototype.toUpperCase.call(str[i]);
        isCamel = false;
      }
      res += cur;
    }
    i++;
  }
  return res;
}

console.log(snakeToCamel("snake_case"));
// 'snakeCase'
console.log(snakeToCamel("is_flag_on"));
// 'isFlagOn'
console.log(snakeToCamel("is_IOS_or_Android"));
// 'isIOSOrAndroid'
console.log(snakeToCamel("_first_underscore"));
// '_firstUnderscore'
console.log(snakeToCamel("last_underscore_"));
// 'lastUnderscore_'
console.log(snakeToCamel("_double__underscore_"));
// '_double__underscore_'
