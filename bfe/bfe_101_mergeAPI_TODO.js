// getAPI is bundled with your code, config will only be some plain objects.
// const getAPI = <T>(path: string, config: SomeConfig): Promise<T> => { ... }

// you code here maybe, if you want some outer scope.
var cache = new Map();
function generateKey(path, config) {
  var key = Object.keys(config)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => k + ":" + config[k].toString())
    .join("&");
  return path + key;
}
var lastCall;
var q = [];
/**
 * @param {string} path
 * @param {object} config
 * only plain objects/array made up serializable primitives
 * @returns {Promise<any>}
 */
async function getAPIWithMerging(path, config) {
  var key = generateKey(path, config);
  var time = Date.now();
  if (cache.has(key)) {
    console.log("cache hit!");
    if (lastCall && time - lastCall >= 1000) {
      console.log("time >= 1000ms");
      var idx = q.indexOf(key);
      if (idx !== q.length - 1) {
        [q[idx], q[q.length - 1]] = [q[q.length - 1], q[idx]];
      }
    } else {
      return cache.get(key);
    }
  }
  console.log("cache miss!", key);
  if (key !== q[q.length - 1]) {
    if (cache.size === 5) {
      var pre = q.shift();
      cache.delete(pre);
    }
    q.push(key);
  }
  lastCall = time;
  try {
    var resp = await getAPI(path, config);
    console.log("resp success", resp);
    cache.set(key, resp);
    return resp;
  } catch (e) {
    console.log("api error:", e);
    throw e;
  }
}

getAPIWithMerging.clearCache = () => {
  cache.clear();
};

getAPIWithMerging("/list", { type: "bfe", filter: "dev", list: [1, 2, 3] });
getAPIWithMerging("/list", { filter: "dev", type: "bfe", list: [1, 2, 3] });
getAPIWithMerging("/list", { list: [1, 2, 3], filter: "dev", type: "bfe" });

// TODO:
// "cache miss!" "/listfilter:dev&list:1,2,3&type:bfe"
// ▸
// "api error:" Error
// ▸
// "cache miss!" "/listfilter:dev&list:1,2,3&type:bfe"
// ▸
// "api error:" Error
// ▸
// "cache miss!" "/listfilter:dev&list:1,2,3&type:bfe"
// ▸
// "api error:" Error
