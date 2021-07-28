/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
var map = new Map(); // <node, handlers>
function onClick(root, predicate, handler) {
  if (map.has(root)) {
    map.get(root).push([predicate, handler]);
    return;
  }
  map.set(root, [[predicate, handler]]);
  var immediate = false;
  var stop = false;

  root.addEventListener(
    "click",
    (e) => {
      e.stopImmediatePropagation = () => {
        immediate = true;
      };
      e.stopPropagation = () => {
        stop = true;
      };
      var handlers = map.get(root);
      var target = e.target;
      while (target !== root) {
        for ([p, h] of handlers) {
          if (p(target)) {
            h.call(target, e);
          }
          if (immediate) {
            return;
          }
        }
        if (stop) {
          return;
        }
        target = target.parentElement;
      }
    },
    false
  );
}

//  Can you create a function which works like jQuery.on(), that attaches event listeners to selected elements.

// In jQuery, selector is used to target the elements, in this problem, it is changed to a predicate function.

// onClick(
//   // root element
//   document.body,
//   // predicate
//   (el) => el.tagName.toLowerCase() === 'div',
//   function(e) {
//     console.log(this);
//     // this logs all the `div` element
//   }
// )
// event.stopPropagation() and event.stopImmediatePropagation() should also be supported.

// you should only attach one real event listener to the root element.

// https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
// https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
