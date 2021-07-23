async function throttlePromises(funcs, max) {
  var res = [];
  while (res.length < funcs.length) {
    var cur = funcs.slice(res.length, Math.min(funcs.length, res.length + max));
    try {
      var curResp = await Promise.all(cur.map((fn) => fn()));
    } catch (e) {
      throw e;
    }
    res.push(...curResp);
  }
  return res;
}

// Docs:
// promise.all(iterable):
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

// Solution 2:
// Wrap the answer in an Promise Object:
// return an promise
async function throttlePromises(funcs, max) {
  return new Promise(async (resolve, reject) => {
    var res = [];
    while (res.length < funcs.length) {
      var cur = funcs.slice(
        res.length,
        Math.min(funcs.length, res.length + max)
      );
      try {
        var curResp = await Promise.all(cur.map((fn) => fn()));
      } catch (e) {
        reject(e);
      }
      res.push(...curResp);
    }
    resolve(res);
  });
}
