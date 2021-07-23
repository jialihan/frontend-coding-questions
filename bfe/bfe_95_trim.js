// Docs:

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim

// Whitespace in this context is all the whitespace characters
// (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

/**
 * @param {string} str
 * @return {string}
 */
function trim(str) {
  if (!str) {
    return str;
  }
  const whitespaces = ["s", "\t", "\n", "\r", " ", " ", "\u3000"];
  var i = 0,
    j = str.length - 1;
  while (whitespaces.includes(str[i])) {
    i++;
  }
  while (whitespaces.includes(str[j])) {
    j--;
  }
  if (j < i) {
    return "";
  }
  return str.slice(i, j + 1);
}
