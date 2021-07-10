// 39. implement range()

/**
 * @param {integer} from
 * @param {integer} to
 */
// // Solution1: function generator
// function range(from, to) {
//   return (function* gen(){
//     while(from<=to)
//     {
//       yield from++;
//     }
//   })(from, to);
// }

// Solution2: iterator & iterable protocol
function range(from, to) {
  var i = from;
  return {
    next: function () {
      return i <= to
        ? {
            value: i++,
            done: false
          }
        : {
            done: true
          };
    },
    [Symbol.iterator]: function () {
      return this;
    }
  };
}

// Test
// for (let num of range(1, 4)) {
//   console.log(num)
// }
