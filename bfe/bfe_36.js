// 36. create a fake timer(setTimeout)

// Notes:
// - use Arrow function to make use of the "lexical scope", just use "this"
// - sort the task array by exec time
// - use filter() to delete the task in clearTimeout()

class FakeTimer {
  time = 0;
  tasks = [];
  install() {
    // replace window.setTimeout, window.clearTimeout, Date.now
    // with your implementation
    this.originSetTimeout = window.setTimeout;
    this.originClearTimeout = window.clearTimeout;
    this.originDateNow = Date.now;
    window.setTimeout = (cb, wait) => {
      wait += this.time;
      var newTask = {
        callback: cb,
        wait
      };
      this.tasks.push(newTask);
      this.tasks.sort((a, b) => a.wait - b.wait);
      return newTask;
    };
    window.clearTimeout = (t) => {
      this.tasks = this.tasks.filter(
        (task) => task.callback !== t.callback || task.wait !== t.wait
      );
    };
    Date.now = () => this.time;
  }

  uninstall() {
    // restore the original implementation of
    // window.setTimeout, window.clearTimeout, Date.now
    window.setTimeout = this.originSetTimeout;
    window.clearTimeout = this.originClearTimeout;
    Date.now = this.originDateNow;
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.tasks.length > 0) {
      var { callback, wait } = this.tasks.shift();
      this.time = wait;
      callback();
    }
  }
}
