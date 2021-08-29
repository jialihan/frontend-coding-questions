/**
 * @param {Node} root
 * @return {string}
 */
function serialize(root) {
  var arr = [];
  function preOrder(node) {
    if (node === null) {
      arr.push("null");
      return;
    }
    arr.push(node.val);
    preOrder(node.left);
    preOrder(node.right);
  }
  preOrder(root);
  return arr.join(",");
}

/**
 * @param {string} str
 * @return {Node}
 */
function deserialize(str) {
  var arr = str.split(",");
  function deserializeHelper() {
    if (arr.length === 0) {
      return null;
    }
    var val = arr.shift();
    if (val === "null") {
      return null;
    }
    var node = new Node(val);
    node.left = deserializeHelper();
    node.right = deserializeHelper();
    return node;
  }
  return deserializeHelper();
}

// LEETCODE 297

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  var res = [];
  var stack = [root];
  while (stack.length > 0) {
    var cur = stack.pop();
    if (cur) {
      res.push(cur.val);
      stack.push(cur.right);
      stack.push(cur.left);
    } else {
      res.push(null);
    }
  }
  return JSON.stringify(res);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  var arr = JSON.parse(data);
  function helper() {
    if (arr.length === 0) {
      return null;
    }
    var value = arr.shift();
    if (value === null) {
      return null;
    }
    var node = new TreeNode(value);
    node.left = helper();
    node.right = helper();
    return node;
  }
  return helper();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
