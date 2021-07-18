// 71. implement Observable Subject

// You can use Observer which is bundled to your code

// class Observer {
//   // subscriber could one next function or a handler object {next, error, complete}
//   constructor(subscriber) { }
//   next(value) { }
//   error(error) { }
//   complete() {}
// }

class Subject {
  constructor() {
    this.observers = [];
    this.next = this.next.bind(this);
    this.complete = this.complete.bind(this);
    this.error = this.error.bind(this);
  }
  next(val) {
    this.observers.forEach((ob) => ob.next(val));
  }
  error(err) {
    this.observers.forEach((ob) => ob.error(err));
  }
  complete() {
    this.observers.forEach((ob) => ob.complete());
  }
  subscribe(subscriber) {
    this.observers.push({
      next: typeof subscriber === "function" ? subscriber : subscriber.next,
      complete: subscriber.complete ? subscriber : () => {},
      error: subscriber.err ? subscriber.error : () => {}
    });
    var lastIndex = this.observers.length;
    return {
      unsubscribe: () => {
        this.observers.splice(lastIndex, 1);
      }
    };
  }
}
