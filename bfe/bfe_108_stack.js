/* you can use this Queue which is bundled together with your code
class Queue {
  enqueue(element) {
    // add new element to the queue
  }
  peek() { 
    // return the head element
  }
  dequeue() { 
    // remove head element from the queue
  }
  size() { 
    // return the queue size
  }
}
*/

// you need to complete the following Stack, using only Queue
class Stack {
  q = [];
  push(element) {
    // push an element into the stack
    this.q.unshift(element);
  }
  peek() {
    // get the top element
    return this.q.length > 0 ? this.q[0] : undefined;
  }
  pop() {
    // remove top element from stack
    if (this.q.length > 0) {
      return this.q.shift();
    }
    return null;
  }
  size() {
    // return count of elements
    return this.q.length;
  }
}
