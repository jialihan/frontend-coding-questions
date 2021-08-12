Array.prototype.myMap = function (fn, that) {
  var res = [];
  var len = this.length; // #2. infinite loop bug, arr's length might change
  for (var i = 0; i < len; i++) {
    if (i in this) {
      // #1. empty indexes should be ignored
      res[i] = fn.call(that, this[i], i, this);
    }
  }
  return res;
};

// for (var i = 0; i < this.length; i++) {} // WRONG!!!!
