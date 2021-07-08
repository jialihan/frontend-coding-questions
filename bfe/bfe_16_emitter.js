// // https://gist.github.com/mudge/5830382
// // https://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=471400&highlight=%C1%B3%CA%E9%2B%C7%B0%B6%CB
// ------------------------------------------------------------------------------------

//     我们的任务是去构写一个emitter

// 1. emitter 包含了 三个功能： subscription，emit，release

// 2. 我们可以通过 subscription 把一个EventName 和 这个Event 对应的callback function 整合成一个object 返回

// eg: const sub = emitter.subscription('EventName', callback);

// 3. 我们可以通过emit去触发某个Event根据给予的EventName，并且可以在EventName后面传入复数个peremter 给Event对应的callback 使用

// 4. 我们可以通过每个返回的 event object 里面的 release function 去release 刚才做过的subscription。

// 详细例子：

// const sub = emitter.subscription('EventName', callback);
// const sub1 = emitter.subscription('EventName', callback);
// const sub2 = emitter.subscription('EventName', callback2);
// const sub3 = emitter.subscription('EventName2', callback3);

// emitter.emit('EventName', foo, bar);

// sub.release();

// 从例子里，我follow出了如下额外要求：

// 1. 可以给同一个EventName 添加复数个callback，并且可以添加一摸一样的callback复数次：
// const sub = emitter.subscription('EventName', callback);
// const sub1 = emitter.subscription('EventName', callback);
// const sub2 = emitter.subscription('EventName', callback2);

// 2. 当使用emit去触发某个event的时候，这个event的所有callback 会全部触发：
// emitter.emit('EventName', foo, bar);
// 因为上面的subscription 如下callbacks会这样被触发
// callback(foo, bar)
// callback(foo, bar)
// callback2(foo, bar)

// 3. 当使用返回的object里面的release的时候，你只会release掉这个object 当初被subscription 返回的时候里面assign的那个callback （Tips：如果有同样的复数个callback，你release掉哪个都是一样的）：
// sub.release(); //某一个callback 会被release掉
// sub2.release(); //callback2会被 release掉
// sub1.release(): //最后一个callback会被release掉

// 面试的难点还是在于审题和讨论部分，那些说的很清楚的额外要求，一开始是完全没有的，面试官也没有准备说，是我自己提出疑问，他再加深解释，才一步一步清晰这道题的全部面貌。
// 这道题我做了 40分钟的样子，主体细节都是自己写的，前期花了10分钟左右审题，和讨论那些额外的要求，然后开始设计，写出来以后有bug，面试官提出异议，我看了之后发现秒改，如此这样大概3次。最后跪了。面试一共45分钟。做得不好的地方，与大家共勉。

class Emitter {
  constructor() {
    this.map = {};
  }

  subscribe(event, func) {
    if (!this.map[event]) {
      this.map[event] = [];
    }

    this.map[event].push(func);

    // this points to Emitter class
    return {
      release: () => {
        // this points to Emitter class due to lexcial scope of arrow function
        const index = this.map[event].indexOf(func);
        if (index >= 0) {
          this.map[event].splice(index, 1);
          if (!this.map[event].length) delete this.map[event];
        }
      }
    };
  }

  emit(event, ...args) {
    // this points to Emitter class
    if (!this.map[event]) throw new Error();
    this.map[event].forEach((func) => {
      // this points to Emitter class due to lexical scope of Arrow func
      func.call(this, ...args);
    });
  }
}

// OPTIMIZE: with Map(eventName, Map(fn, count))
class EventEmitter {
  constructor() {
    this.map = new Map(); // <eventName, <callback, count>>
  }
  subscribe(eventName, callback) {
    if (!this.map.has(eventName)) {
      this.map.set(eventName, new Map());
    }
    var cntMap = this.map.get(eventName);
    cntMap.set(callback, (cntMap.get(callback) || 0) + 1);
    return {
      release: () => {
        var newCount = this.map.get(eventName).get(callback) - 1;
        if (newCount === 0) {
          cntMap.delete(callback);
        } else {
          cntMap.set(callback, newCount);
        }
      }
    };
  }
  emit(eventName, ...args) {
    if (!this.map.has(eventName)) {
      return;
    }
    for (var [key, value] of this.map.get(eventName)) {
      for (var t = 0; t < value; t++) {
        key.call(this, ...args);
      }
    }
  }
}
