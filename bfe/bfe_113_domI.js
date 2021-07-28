// Suppose you have solved 110. serialize and deserialize binary tree, have you wondered how to do similar task to DOM tree ?

// HTML string could be thought as some sort of serialization, the browser parses(deserialize) the HTML → construct the DOM tree.

// Besides XML base, we could try JSON for this. If we log the element presentation in React, like below

// const el = <div>
//  <h1> this is </h1>
//  <p className="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a>
//  </p>
// </div>;

// console.log(el)
// we would get this( ref, key .etc are stripped off)

// {
//   type: 'div',
//   props: {
//     children: [
//       {
//         type: 'h1',
//         props: {
//           children: ' this is '
//         }
//       },
//       {
//         type: 'p',
//         props: {
//           className: 'paragraph',
//           children: [
//             ' a ',
//             {
//               type: 'button',
//               props: {
//                 children: ' button '
//               }
//             },
//             ' from',
//             {
//               type: 'a',
//               props: {
//                 href: 'https://bfe.dev',
//                 children: [
//                   {
//                     type: 'b',
//                     props: {
//                       children: 'BFE'
//                     }
//                   },
//                   '.dev'
//                 ]
//               }
//             }
//           ]
//         }
//       }
//     ]
//   }
// }
// Clearly this is the same tree structure but only in object literal.

// Now you are asked to serialize/deserialize the DOM tree, like what React does.

// Note

// Functions like event handlers and custom components are beyond the scope of this problem, you can ignore them, just focus on basic HTML tags.

// You should support:

// TextNode (string) as children
// single child and multiple children
// camelCased properties.
// virtualize() takes in a real DOM tree and create an object literal render() takes in a object literal presentation and recreate a DOM tree.
/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
function virtualize(element) {
  var res = {
    type: element.tagName.toLowerCase(),
    props: {}
  };
  // handle properties
  for (var attr of element.attributes) {
    var attrName = attr.name === "class" ? "className" : attr.name;
    res.props[attrName] = element.getAttribute(attr.name);
  }
  // handle childNodes
  var children = [];
  for (var child of element.childNodes) {
    if (child.nodeType === 3) {
      // if a textNode
      children.push(child.textContent);
    } else {
      children.push(virtualize(child));
    }
  }
  res.props.children = children.length === 1 ? children[0] : children;
  return res;
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */
function render(obj) {
  if (typeof obj === "string") {
    return document.createTextNode(obj);
  }
  var {
    type,
    props: { children, ...attrs }
  } = obj;
  var element = document.createElement(type);

  // add attributes
  for (var [name, val] of Object.entries(attrs)) {
    element[name] = val;
  }
  // handle children
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((el) => {
        element.appendChild(render(el));
      });
    } else {
      element.appendChild(render(children));
    }
  }
  return element;
}

// Note: type of nodes
// Node.ELEMENT_NODE	1	An Element node like <p> or <div>.
// Node.ATTRIBUTE_NODE	2	An Attribute of an Element.
// Node.TEXT_NODE	3	The actual Text inside an Element or Attr.
