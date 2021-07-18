// 72. implement Observable interval()

// Suppose you have solved 57. create an Observable, here you are asked to implement a creation operator interval().

// From the document, interval()

// Creates an Observable that emits sequential numbers every specified interval of time

// interval(1000).subscribe(console.log);
// Above code prints 0, 1, 2 .... with an interval of 1 seconds.

// Note Observable is already given for you, no need to create it.

/**
 * @param {number} period
 * @return {Observable}
 */
function interval(period) {
  return new Observable((subscribe) => {
    let num = 0;
    setInterval(() => {
      subscribe.next(num++);
    }, period);
  });
}
