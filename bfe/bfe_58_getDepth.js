// https://bigfrontend.dev/problem/get-DOM-tree-height
/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  if (!tree) {
    return 0;
  }
  var max = 0;
  for (var next of tree.children) {
    max = Math.max(getHeight(next), max);
  }
  return max + 1;
}

// const div = document.createElement('div')
// div.innerHTML =`
// iv>
//   <p>
//     <button>Hello</button>
//   </p>
// </div>
// <p>
//   <span>World!</span>
// </p>
// `;
// console.log(getHeight(div));
