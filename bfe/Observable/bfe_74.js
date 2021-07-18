// 74. implement Observable Transformation Operators

// Observable has pipe() method which could make this more readable.

// const source = Observable.from([1,2,3])

// source.pipe(map(x => x * x))
//  .subscribe(console.log)
// // 1
// // 4
// // 9
// Note Observable is already given for you, no need to create it.

/**
 * @param {any} input
 * @return {(observable: Observable) => Observable}
 * returns a function which trasnform Observable
 */
function map(transform) {
  return function (source) {
    return new Observable((subscribe) => {
      subscribe.next(transform(source));
    });
  };
}
