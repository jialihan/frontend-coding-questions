// 17. Create a simple store for DOM element

// Notes:
// access the attribute of the node element in DOM, use element.attribute or element.getAttribute('...')

// Docs: https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes

// Wrong way: element[attribute]

class NodeStore {
  id = 0;
  nodes = {};
  static _NODESTROE = "NODE_STORE_ID";
  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    if (!node._NODESTROE) {
      node._NODESTROE = this.id++;
    }
    this.nodes[node._NODESTROE] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    return this.nodes[node._NODESTROE];
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return !!this.nodes[node._NODESTROE];
  }
}

// optimized: use Symbol & instance variable
class NodeStore {
  store = new Map();
  nodeID = Symbol();
  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    if (!node.nodeID) {
      node.nodeID = Symbol();
    }
    this.store.set(node.nodeID, value);
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    return this.store.get(node.nodeID);
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return this.store.has(node.nodeID);
  }
}
