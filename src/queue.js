const { NotImplementedError, ListNode } = require("../extensions/index.js");

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.item = null;
  }
  getUnderlyingList() {
    return this.item;
  }

  enqueue(val) {
    const node = new ListNode(val);
    if (!this.item) {
      this.item = node;
      return;
    }
    let current = this.item;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }

  dequeue() {
    const res = this.item.value;
    this.item = this.item.next;
    return res;
  }
}

module.exports = {
  Queue,
};
