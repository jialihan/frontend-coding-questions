/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
var map = new Map();
function mySetInterval(func, delay, period) {
  var count = 0;
  var id = setTimeout(run, delay + period * count++);
  function run() {
    func();
    var nextId = setTimeout(run, delay + period * count++);
    map.set(id, nextId);
  }
  return id;
}

/**
 * @param { number } id
 */
function myClearInterval(id) {
  clearTimeout(id);
  if (map.has(id)) {
    window.clearTimeout(map.get(id));
    map.delete(id);
  }
}
