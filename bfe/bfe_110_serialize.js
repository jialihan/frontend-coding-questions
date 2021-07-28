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

Sale.prototype.getPrice = function () {
  var price = this.price,
    i,
    max = this.decorators_list.length,
    name;
  for (i = 0; i < max; i += 1) {
    name = this.decorators_list[i];
    price = Sale.decorators[name].getPrice(price);
  }
  return price;
};
