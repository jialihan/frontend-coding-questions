/**
 * @param {HTMLElement} el - element to be wrapped
 */
function $(el) {
  return {
    css: function (prop, value) {
      el.style[prop] = value;
      return this; // can NOT use arraow func here, since we need "this" keyword
    }
  };
}

// Notes
// - NOT use ()=>{} arrow func here, since we need "this" keyword to chaining
// - the element is already in param: el is the element, NOT use "document.querySelector(el)" again
