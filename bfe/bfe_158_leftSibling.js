/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
function previousLeftSibling(root, target) {
  if (!root) {
    return null;
  }
  var q = [root];
  while (q.length > 0) {
    var size = q.length;
    var next = [];
    for (var i = 0; i < size; i++) {
      var cur = q.shift();
      if (cur === target && i === 0) {
        return null;
      }
      if (q.length > 0 && q[0] === target) {
        return cur;
      }
      for (var child of cur.children) {
        next.push(child);
      }
    }
    q = next;
  }
  return null;
}
myExpect(null).not.toBe(undefined);
