/**
 * @param {{value: string}} state
 * @param {HTMLInputElement} element
 */
function model(state, element) {
  element.value = state.value;
  Object.defineProperty(state, "value", {
    get() {
      return element.value;
    },
    set(val) {
      element.value = val;
    }
  });
}

// docs:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
