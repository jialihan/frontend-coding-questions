// This is a follow-up on 36. create a fake timer(setTimeout)
class FakeTimer {
  time = 0;
  tasks = [];
  id = 0;
  install() {
    // replace window.setInterval, window.clearInterval, Date.now
    // with your implementation
    this.originSetInterval = window.setInterval;
    this.originClearInterval = window.clearInterval;
    this.originDateNow = Date.now;
    window.setInterval = (fn, wait) => {
      var timer = this.time + wait;
      var newTask = {
        id: ++this.id,
        fn,
        wait,
        timer
      };
      this.tasks.push(newTask);
      this.tasks.sort((a, b) => a.timer - b.timer);
      return this.id;
    };
    window.clearInterval = (timerId) => {
      var idx = this.tasks.findIndex((task) => task.id === timerId);
      if (idx >= 0) {
        this.tasks.splice(idx, 1);
      }
    };
    Date.now = () => this.time;
  }

  uninstall() {
    // restore the original implementation of
    // window.setInterval, window.clearInterval, Date.now
    window.setInterval = this.originSetInterval;
    window.clearInterval = this.originClearInterval;
    Date.now = this.originDateNow;
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.tasks.length) {
      var task = this.tasks.shift();
      // update current time
      this.time = task.timer;
      // trigger next task
      var newTask = { ...task, timer: task.timer + task.wait };
      var insertIndex = this.tasks.findIndex((item) => item.timer > task.timer);
      if (insertIndex >= 0) {
        this.tasks.splice(insertIndex - 1, 0, newTask);
      } else {
        this.tasks.push(newTask);
      }
      // exec current task
      task.fn();
    }
  }
}
