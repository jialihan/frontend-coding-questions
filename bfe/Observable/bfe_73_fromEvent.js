// 73. implement Observable fromEvent()

// From the document, fromEvent()

// Creates an Observable that emits events of a specific type coming from the given event target.

// Simply speaking, it is a util to attach event listener in Observable fashion.

// const source = fromEvent(node, 'click')
// source.subscribe((e) => console.log(e))
// When node is clicked, the event is logged.

// Note

// Observable is already given for you, no need to create it.
// the event listener removal is handled by add(), which is beyond our scope here, you can ignore that.

/**
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {boolean} capture
 * @return {Observable}
 */
function fromEvent(element, eventName, capture = false) {
  return new Observable((subscribe) => {
    element.addEventListener(
      eventName,
      function (e) {
        subscribe.next(e);
      },
      { capture }
    );
  });
}
