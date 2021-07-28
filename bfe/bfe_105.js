/**
 * @param {string} str
 * @return {string | null}
 */
function firstDuplicate(str) {
  var set = new Set();
  for (var c of [...str]) {
    if (set.has(c)) {
      return c;
    }
    set.add(c);
  }
  return null;
}
