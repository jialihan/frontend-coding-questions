// /**
//  * @param {Function} func
//  * @param {number} delay
//  * @param {number} period
//  * @return {number}
//  */
// var map = new Map();
// function mySetInterval(func, delay, period) {
//   var count = 0;
//   var id = setTimeout(run, delay + period * count++);
//   function run() {
//     func();
//     var nextId = setTimeout(run, delay + period * count++);
//     map.set(id, nextId);
//   }
//   return id;
// }

// /**
//  * @param { number } id
//  */
// function myClearInterval(id) {
//   clearTimeout(id);
//   if (map.has(id)) {
//     window.clearTimeout(map.get(id));
//     map.delete(id);
//   }
// }

const set = new Set();
let gid = 0;
/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
function mySetInterval(func, delay, period) {
  let cnt = 0;
  const curId = gid++;
  function run(fn) {
    window.setTimeout(() => {
      if (!set.has(curId)) {
        return;
      }
      fn();
      cnt++;
      run(fn);
    }, delay + period * cnt);
  }
  set.add(curId);
  run(func);
  return curId;
}

/**
 * @param { number } id
 */
function myClearInterval(id) {
  set.delete(id);
}
