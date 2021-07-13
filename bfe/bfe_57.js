// BFE 57
// https://bigfrontend.dev/problem/create-an-Observable
//  https://www.youtube.com/watch?v=45TeJEmcqk8&list=PLREW9ZuU80uTfmxo61-acnUYk3P_4plIF&index=7
// https://www.youtube.com/watch?v=Tux1nhBPl_w
class Observable {
  constructor(setup) {
    this.setup = setup;
  }
  subscribe(subscriber) {
    var sub = new Observer(subscriber);
    this.setup(sub);
    return {
      unsubscribe() {
        sub.unsubscribe();
      }
    };
  }
}
class Observer {
  constructor(subscriber) {
    if (typeof subscriber === "function") {
      this.subscriber = { next: subscriber };
    } else {
      this.subscriber = subscriber;
    }
    this.unsubscribed = false;
  }
  next(val) {
    if (this.unsubscribed) {
      return;
    }
    if (this.subscriber.next) {
      try {
        this.subscriber.next(val);
      } catch (err) {
        this.error(err);
      }
    }
  }
  complete() {
    if (this.unsubscribed) {
      return;
    }
    if (this.subscriber.complete) {
      this.subscriber.complete();
    }
    this.unsubscribe();
  }
  error(err) {
    if (this.unsubscribed) {
      return;
    }
    if (this.subscriber.error) {
      this.subscriber.error(err);
    }
    this.unsubscribe();
  }
  unsubscribe() {
    this.unsubscribed = true;
    this.subscriber = null;
  }
}
