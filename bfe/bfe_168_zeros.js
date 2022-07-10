// This is a JavaScript coding problem from BFE.dev

// O(N) solution

/**
 * @param {Array<any>} list
 * @returns {void}
 */
function moveZeros(list) {
  let index = 0; // last non-zero index
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0) {
      swap(list, i, index);
      index++;
    }
  }
  return list;
}
function swap(arr, x, y) {
  [arr[x], arr[y]] = [arr[y], arr[x]];
}
