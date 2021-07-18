// 68. get DOM tags

// Note: tagName property is returned as Capital letter,
// eg: "DIV, BUTTON",..... need to transform to be lowercase,
// using ".toLowerCase()".
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  var set = new Set();
  function dfs(node) {
    if (!node) {
      return;
    }
    set.add(node.tagName.toLowerCase());
    for (var el of node.children) {
      dfs(el);
    }
  }
  dfs(tree);
  return Array.from(set);
}
