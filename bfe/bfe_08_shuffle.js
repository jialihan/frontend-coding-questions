/**
 * @param {any[]} arr
 */
function shuffle(arr) {
  // modify the arr inline to change the order randomly
  for (var i = arr.length - 1; i > 0; i--) {
    var newIndex = Math.floor(Math.random() * (i + 1));
    // swap i & newIdx
    [arr[i], arr[newIndex]] = [arr[newIndex], arr[i]];
  }
}
// const arr = [1, 2, 3, 4];
// shuffle(arr);
// console.log(arr);
