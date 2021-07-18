Function.prototype.mycall = function (thisArg, ...args) {
  // 1. thisArg defaults to windows (strict mode is not allowed)
  thisArg = thisArg || window;

  // 1.1 transform primitive values
  thisArg = Object(thisArg);

  // 2. Specify this using object calls
  var fnKey = Symbol();
  thisArg[fnKey] = this; // "this" -> function object to be called

  // 3. call it with parameters
  var res = thisArg[fnKey](...args);

  // 4. Delete attributes of additional objects to eliminate side effects
  delete thisArg[fnKey];

  // 5. Return results
  return res;
};

// similar apply
Function.prototype.myApply = function (thisArg, args) {
  // 1. thisArg defaults to windows (strict mode is not allowed)
  thisArg = thisArg || window;

  // 1.1 transform primitive values
  thisArg = Object(thisArg);

  // 2. Specify this using object calls
  var fnKey = Symbol();
  thisArg[fnKey] = this; // "this" -> function object to be called

  // 3. call it with parameters
  var res = thisArg[fnKey](...args);

  // 4. Delete attributes of additional objects to eliminate side effects
  delete thisArg[fnKey];

  // 5. Return results
  return res;
};

var foo = function (msg) {
  console.log("hello " + msg, this);
};
var me = { name: "jelly" };
foo.myApply(me, ["world"]);

// bind
Function.prototype.softBind = function (thisArg) {
  var self = this; // func to be bind
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    var allArgs = args.concat([...arguments]);
    var res = self.apply(thisArg, allArgs);
    return res;
  };
};

var foo = function (a, b) {
  console.log(a, b, this);
};
var me = { name: "jelly" };
foo.bind(me, "arg1")("arg2");
