// 24. create a Priority Queue in JavaScript

// complete the implementation
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.q = [];
    this.compare = compare;
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.q.length;
  }

  /**
   * returns the head element
   */
  peek() {
    return this.q[0];
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    this.q.push(element);
    this.q.sort(this.compare);
  }
  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    return this.q.shift();
  }
}

/**************************************************
 * Tests
 */
//  Here is an example to make it clearer

const pq = new PriorityQueue((a, b) => a - b);
// (a, b) => a - b means
// smaller numbers are closer to index:0
// which means smaller number are to be removed sooner

pq.add(5);
// now 5 is the only element

pq.add(2);
// 2 added

pq.add(1);
// 1 added

pq.peek();
// since smaller number are sooner to be removed
// so this gives us 1

pq.poll();
// 1
// 1 is removed, 2 and 5 are left

pq.peek();
// 2 is the smallest now, this returns 2

pq.poll();
// 2
// 2 is removed, only 5 is left
