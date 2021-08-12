// bfe #140

// In problem 118, you are asked to implement createElement() and render() function which supports intrinsic HTML elements, like <p/>, <div/> etc.

// In this problem, you are ask to support custom Functional Component.

// Functional Component are functions that:

// accept single object argument -props, which contains children, className and other properties.
// returns an MyElement by calling createElement().
// Say we have a Functional Component - Title

// const h = createElement
// const Title = ({children, ...res}) => h('h1', res, ...children)
// Then we should be able to use it in createElement and render(), just the same way as an intrinsic element.

// h(Title, {}, 'This is a title')

// h(Title, {className: 'class1'}, 'This is a title')

/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 * type FunctionComponent = (props: object) => MyElement
 */

/**
 * @param { string | FunctionComponent } type - valid HTML tag name or Function Component
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  if (typeof type === "function") {
    return type({ children, ...props });
  }
  return { type, props, children };
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
