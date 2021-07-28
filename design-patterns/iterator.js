function* gen() {
  yield* [1, 2, 3];
}
var myIterator = gen();
console.log(myIterator.next()); // {value: 1, done: false}
console.log(myIterator.next().value); // 1

// var myIterable = {
//     [Symbol.iterator]: gen
// }
var myIterable = {
  [Symbol.iterator]: function* () {
    yield* [1, 2, 3];
  }
};
for (var val of myIterable) {
  console.log(val);
}
console.log(...myIterable);

// iterator pattern
var myIterator = (function () {
  var index = 0,
    data = [1, 2, 3],
    length = data.length;
  return {
    next: function () {
      var element;
      if (!this.hasNext()) {
        return null;
      }
      element = data[index++];
      return element;
    },
    hasNext: function () {
      return index < length;
    },
    rewind: function () {
      index = 0;
    },
    current: function () {
      return data[index];
    }
  };
})();

// test
while (myIterator.hasNext()) {
  console.log(myIterator.next());
}
// go back
myIterator.rewind();
console.log(myIterator.current()); // 1
