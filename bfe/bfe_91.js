/**
 * @param {Node} node
 * @returns {Node}
 */
// Recursion
function invert(node) {
  if (node === null) {
    return node;
  }
  [node.right, node.left] = [invert(node.left), invert(node.right)];
  return node;
}

// Iterative
function invert(node) {
  if (node === null) {
    return null;
  }
  var q = [node];
  while (q.length > 0) {
    var cur = q.shift();
    [cur.right, cur.left] = [cur.left, cur.right];
    if (cur.left) {
      q.push(cur.left);
    }
    if (cur.right) {
      q.push(cur.right);
    }
  }
  return node;
}
