1. use sematic markup ([link](https://www.w3schools.com/tags/tag_table.asp)):

```html
<table>
  <tr>
    <th>header 1</th>
    <th>header 2</th>
  </tr>
  <tr>
    <td>cell 1</td>
    <td>cell 2</td>
  </tr>
</table>
```

2. how to detect is a char number? use [isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN), note: When the argument to the `isNaN()` function is **not of type Number**, the value is first **coerced** to a number, and the resulting value is then compared against NaN. eg: `isNaN('123'); // true`.

3. why eval is bad?
   An attacker could easily run a script into your input field in order to perform a DOM Based XSS (cross site scripting) attack

4. [dbclick](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event) event also triggers single click event

5. benefit of addEventListener on parent rather on each child:

- due to event bubbling unless you want to stop the event: `event.stopPropagation()`
- another [event capture](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling#event_capture): `element.addEventListener("click", captureHandler, {capture: true});`, the event propogates down from the top of the DOM tree to the target element.

6. `!!!Deprecated:` [event.keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode), please use `event.key === 'Enter/ArrowDown/ArrowLeft'` instead, see more examples in [event.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).

7. [Dom manipulatio](https://jialihan.github.io/blog/#/html_css/dom):

- [querySelectorAll()](https://jialihan.github.io/blog/#/html_css/dom?id=iv-select-multiple-elements-1) is static snapshots of html document, while `getElementById()` returns a **live HTMLCollection**, which is auto updated when dom is changed.
- [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)`.add/remove/toggle()`: it is a read-only property that returns a **live** [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) collection of the class attributes of the element.
- [element.style.border](https://www.w3schools.com/jsref/prop_style_border.asp)
- [element.dataset.XXX](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset): which create the attribute `data-XXX='123'` in the html, also use `element.setAttribute("data-XXX", value)`.
- use "children()" to return only HTML element, while "childNodes()" returns any [node.nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node), eg: `ELEMENT_NODE`, `TEXT_NODE`, etc..
- use [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment): represents a minimal document object that has no parent. Benefit: reduce the reflow, only change the dom once intead of every time insert into the dom.

  ```js
  var fragment = document.createDocumentFragment();
  members.forEach((el) => {
    var itemEL = document.createElement("div");
    itemEL.classList.add("item");
    itemEL.dataset.id = el.id; // data-id="1"
    fragment.appendChild(itemEL); // optimize for N times
  });
  contentEL.appendChild(fragment); // only one time
  ```

8. [css selector](https://jialihan.github.io/blog/#/html_css/css_selectors?id=q4-1):

- global selector: `* { padding: 0; }`.
