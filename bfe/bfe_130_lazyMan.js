// BFE # 130
// https://bigfrontend.dev/problem/create-lazyman
// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn = console.log) {
  var queue = [];
  var timer;
  async function deferRun() {
    while (queue.length > 0) {
      var task = queue.shift();
      await task();
    }
  }
  var addTask = (fn, first = false) => {
    return function (...args) {
      clearTimeout(timer);
      var myFn = fn.bind(null, ...args);
      if (first) {
        queue.unshift(myFn);
      } else {
        queue.push(myFn);
      }
      timer = setTimeout(deferRun, 0);
      return this;
    };
  };
  function sleep(time) {
    return new Promise((resolve, rej) => {
      setTimeout(() => {
        logFn(`Wake up after ${time} second${time > 1 ? "s" : ""}.`);
        resolve();
      }, time * 1000);
    });
  }
  addTask(logFn)(`Hi, I'm ${name}.`);
  return {
    eat: addTask((food) => logFn(`Eat ${food}.`)),
    sleep: addTask(sleep),
    sleepFirst: addTask(sleep, true)
  };
}

/***
 * ES6 Solution
 */

function LazyMan(name, logFn = console.log) {
  return new MyLazyMan(name, logFn);
}
class MyLazyMan {
  constructor(name, fn) {
    this.name = name;
    this.logFn = fn;
    this.queue = [];
    this.queue.push(() => this.logFn(`Hi, I'm ${name}.`));
    setTimeout(() => {
      this.runTasks();
    }, 0);
  }
  eat(food) {
    this.queue.push(() => this.logFn(`Eat ${food}.`));
    return this;
  }
  sleep(time, first = false) {
    var task = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.logFn(`Wake up after ${time} second${time > 1 ? "s" : ""}.`);
          resolve();
        }, time * 1000);
      });
    };
    if (first) {
      this.queue.unshift(task);
    } else {
      this.queue.push(task);
    }
    return this;
  }
  sleepFirst(time) {
    this.sleep(time, true);
    return this;
  }
  async runTasks() {
    while (this.queue.length > 0) {
      var task = this.queue.shift();
      await task();
    }
  }
}

/**
 * Test
 */

// LazyMan("Jack").eat("banana").eat("apple").sleepFirst(2);

LazyMan("Jack")
  .eat("banana")
  .eat("apple")
  .sleepFirst(1)
  .eat("egg")
  .sleepFirst(1);
