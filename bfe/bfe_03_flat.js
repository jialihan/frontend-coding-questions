// 1. recursive
// use ES6 reduce() method

function flat(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, cur) => {
        var item = Array.isArray(cur) ? flat(cur, depth - 1) : cur;
        return acc.concat(item);
      }, [])
    : arr;
}

// Tip: arr.toString().split('').map(e=>parseInt(e));

// 2. iterative
// Use queue model:
// - dequeue at the front
// - process current level
// - next level (depth - 1)
// - enqueue next level at the end
function flat(arr, depth = 1) {
  var queue = arr.map((el) => [el, depth]);
  var res = [];
  while (queue.length > 0) {
    var [cur, dep] = queue.shift(); // dequeue at the front
    if (Array.isArray(cur) && dep > 0) {
      queue.push(...cur.map((el) => [el, dep - 1])); // enqueue at the end
    } else {
      res.push(cur); // add to results
    }
  }
  return res;
}
