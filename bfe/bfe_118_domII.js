/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 */

/**
 * @param { string } type - valid HTML tag name
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  var res = {};
  res.type = type;
  res.props = props || {};
  if (children.length > 0) {
    res.children = [...children];
  }
  return res;
}

/**
 * @param { MyElement }
 * @returns { HTMLElement }
 */
function render(myElement) {
  if (typeof myElement === "string") {
    return document.createTextNode(myElement);
  }
  var { type, props, children } = myElement;
  var element = document.createElement(type);
  // set attributes
  for (var [name, val] of Object.entries(props)) {
    element[name] = val;
  }
  // add children
  children.forEach((el) => element.appendChild(render(el)));
  return element;
}
