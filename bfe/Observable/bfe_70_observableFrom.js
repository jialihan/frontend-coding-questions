// 70. implement Observable.from()
// From the document, from()

// Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

// Your from() should accept all above types.

// from([1,2,3]).subscribe(console.log);
// // 1
// // 2
// // 3

// https://github.com/ReactiveX/rxjs/blob/e0fcd6d0fcf0de897739806091fd9e4f8eadd02a/src/internal/util/subscribeTo.ts

/**
 * @param {Array | ArrayLike | Promise | Iterable | Observable} input
 * @return {Observable}
 */
function from(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (isArrayLike(input)) {
    return subscribeToArray(input);
  } else if (isPromise(input)) {
    return subscribeToPromise(input);
  } else if (!!input && typeof input[Symbol.iterator] === "function") {
    return subscribeToIterable(input);
  } else {
    throw "invalid object input";
  }
}
/*******************************************************************************
 *  Different Subscribe Functions
 *******************************************************************************/
function subscribeToArray(array) {
  return new Observable((subscribe) => {
    for (let i = 0, len = array.length; i < len && !subscribe.closed; i++) {
      subscribe.next(array[i]);
    }
    subscribe.complete();
  });
}
function subscribeToPromise(promise) {
  return new Observable((subscribe) => {
    promise
      .then((value) => {
        if (!subscribe.closed) {
          subscribe.next(value);
          subscribe.complete();
        }
      })
      .catch((err) => {
        subscribe.error(err);
      });
    //   return subscriber;
  });
}
function subscribeToIterable(iterable) {
  var iterator = iterable[Symbol.iterator]();
  return new Observable((subscribe) => {
    do {
      let item;
      try {
        item = iterator.next();
      } catch (err) {
        subscribe.error(err);
        return;
      }
      if (item.done) {
        subscribe.complete();
        break;
      }
      subscribe.next(item.value);
      if (subscribe.closed) {
        break;
      }
    } while (true);
  });
}
/*******************************************************************************
 *  Utils
 *******************************************************************************/
function isArrayLike(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
}
function isPromise(value) {
  return (
    !!value &&
    typeof value.subscribe !== "function" &&
    typeof value.then === "function"
  );
}

// // should throw err
//   function* range() {
//       let i = 0
//       while (i < 5) {
//         if (i === 3) {
//           throw new Error('error')
//         }
//         yield i
//         i += 1
//       }
//     }
//     const gen = range()
//     let result = []
//     let error = null
//     const sub = from(gen).subscribe({
//       next(value) {
//         result.push(value)
//       },
//       error(value) {
//         error = value
//         console.log(result); // toEqual([0,1,2])
//         console.log(error); // error is not null
//       }
//     })
