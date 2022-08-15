// This is a JavaScript coding problem from BFE.dev

/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {string}
 */
function generateSelector(root, target) {
  // your code here
  let selector = [];
  let nthChild;
  while (target !== root) {
    nthChild = Array.from(target.parentElement.children).indexOf(target) + 1;
    selector.unshift(`${target.tagName.toLowerCase()}:nth-child(${nthChild})`);
    target = target.parentNode;
  }
  return selector.join(" > ");
}

// Reference:
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child
