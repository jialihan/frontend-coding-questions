/**
 * @param {HTMLElement | null} root
 * @return {HTMLElement[]}
 */
function flatten(root) {
  var q = [root];
  var res = [];
  while (q.length > 0) {
    var cur = q.shift();
    res.push(cur);
    for (var next of cur.children) {
      q.push(next);
    }
  }
  return res;
}
