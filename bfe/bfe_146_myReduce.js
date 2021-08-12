Array.prototype.myReduce = function (fn, initialValue) {
  if (!initialValue && this.length === 0) {
    throw "error input";
  }
  var acc = arguments.length === 1 ? this[0] : initialValue;
  for (var i = 0; i < this.length; i++) {
    if (i === 0 && arguments.length === 1) {
      continue;
    }
    acc = fn.call(this, acc, this[i], i, this);
  }
  return acc;
};
// Edge case:
// initial value could be undefined spec  , expects "undefined1" but gets 1
// initial value could be null spec  , expects "null1" but gets 1
