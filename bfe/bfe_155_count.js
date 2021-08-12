// bfe 155

// Please create a function count(), when called it should return how many times it has been called, count.reset() should also implemented.

// count() // 1
// count() // 2
// count() // 3

// count.reset()

// count() // 1
// count() // 2
// count() // 3

var cnt = 0;
function count() {
  return ++cnt;
}
count.reset = () => {
  cnt = 0;
};
