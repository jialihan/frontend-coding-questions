// 13. Implement a Queue by using Stack

/* you can use this Class which is bundled together with your code

class Stack {
  push(element) { // add element to stack }
  peek() { // get the top element }
  pop() { // remove the top element}
  size() { // count of element }
}
*/

/* Array is disabled in your code */

// you need to complete the following Class
class Queue {
  constructor() {
    this.bstack = new Stack();
    this.qstack = new Stack();
  }
  enqueue(element) {
    // add new element to the rare
    this.bstack.push(element);
  }
  peek() {
    // get the head element
    if (this.qstack.size() === 0) {
      while (this.bstack.size() > 0) {
        this.qstack.push(this.bstack.pop());
      }
    }
    return this.qstack.peek();
  }
  size() {
    // return count of element
    return this.qstack.size() + this.bstack.size();
  }
  dequeue() {
    // remove the head element
    if (this.qstack.size() === 0) {
      while (this.bstack.size() > 0) {
        this.qstack.push(this.bstack.pop());
      }
    }
    return this.qstack.pop();
  }
}

// Note: I wanna do something cool and simple in class, since it's valid in ES2020 & Typescript like this: [JS classes public fields](
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
// )

// class Queue {
//     // class public fields
//     bstack = new Stack();
//     qstack = new Stack();
//     enqueue(element) {
//     }
//     // ...
// }
// But it's not in ES6, then just init my data in constructor () function in a traditional way with the "this" keyword.
