// This is the class for the node
// you can use this directly as it is bundled with your code

// class Node {
//   value: number
//   left: null | Node
//   right: null | Node
//   constructor(val) {
//     this.value = val
//     this.left = null
//     this.right = null
//   }
// }

/**
 * @param {Node} root
 * @returns {number[]}
 */
function traverse(root) {
  var map = new Map(); // <xpos, [Node]>
  var minX = 0;
  var maxX = 0;
  function dfs(node, x, dep, parent) {
    if (!node) {
      return;
    }
    if (!map.has(x)) {
      map.set(x, []);
    }
    node["dep"] = dep;
    node["parent"] = parent;
    map.get(x).push(node);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    dfs(node.left, x - 1, dep + 1, x);
    dfs(node.right, x + 1, dep + 1, x);
  }
  dfs(root, 0, 0, 0);

  // compute result
  var res = [];
  for (var x = minX; x <= maxX; x++) {
    var arr = map.get(x).sort((a, b) => {
      if (a.dep === b.dep) {
        return a.parent - b.parent; // tricky part
      }
      return a.dep - b.dep;
    });
    arr.forEach((node) => {
      res.push(node.value);
    });
  }
  return res;
}

// Notes:

// 1. need to have a parent field to record the parent X-axis when comparing the order in final result
// 2. in dfs, add dep field
// 3. in dfs, updating the x-axis range of "maxX" and "minX"
