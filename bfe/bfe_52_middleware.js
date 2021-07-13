// 52. create a middleware system
// https://bigfrontend.dev/problem/create-a-middleware-system
// Express Doc: http://expressjs.com/en/guide/using-middleware.html#middleware.application
class Middleware {
  callbacks = [];
  errors = [];
  req = null;
  // error = null; // NOT Needed

  use(func) {
    if (func.length === 3) {
      this.errors.push(func);
    } else if (func.length === 2) {
      this.callbacks.push(func);
    }
  }
  start(req) {
    this.req = req;
    this.next();
  }
  next(err) {
    var args = [this.req, this.next.bind(this)];
    var fn; // function to be called: callbacks or errorHandlers
    if (err) {
      fn = this.errors.shift();
      args.unshift(err);
    } else {
      fn = this.callbacks.shift();
    }
    try {
      fn.apply(this, args);
    } catch (err) {
      this.next(err); // recursive to handle current error
    }
  }
}
