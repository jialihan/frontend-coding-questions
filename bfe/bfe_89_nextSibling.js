// Initial level order version
function nextRightSibling(root, target) {
  var nodes = [root];
  while (nodes.length > 0) {
    var index = nodes.indexOf(target);
    if (index >= 0) {
      return index === nodes.length - 1 ? null : nodes[index + 1];
    }
    // process next level
    var size = nodes.length;
    var next = [];
    for (var i = 0; i < size; i++) {
      for (var ch of nodes[i].children) {
        next.push(ch);
      }
    }
    nodes = next;
  }
  // not find target
  return null;
}

// Simplified Version
/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
  var q = [root];
  while (q.length > 0) {
    var cur = q.shift();
    if (cur === target) {
      return q.shift() ?? null;
    }
    q.push(...cur.children);
  }
  // not find target
  return null;
}
