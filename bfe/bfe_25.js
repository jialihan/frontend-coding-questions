// 25. Reorder array with new indexes

// const A = ['A', 'B', 'C', 'D', 'E', 'F']
// const B = [1,   5,   4,   3,   2,   0]
// You need to reorder A, so that the A[i] is put at index of B[i], which means B is the new index for each item of A.

// For above example A should be modified inline to following

// ['F', 'A', 'E', 'D', 'C', 'B']
// The input are always valid.

// follow-up

// It is fairly easy to do this by using extra O(n) space, could you solve it with O(1) space?

/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  for (var i = 0; i < items.length; i++) {
    while (i !== newOrder[i]) {
      var next = newOrder[i];
      // exchange both A and B
      [newOrder[i], newOrder[next]] = [newOrder[next], newOrder[i]];
      [items[i], items[next]] = [items[next], items[i]];
    }
  }
}
