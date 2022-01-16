/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (!this.tail) {
      this.tail = this.head;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    this.checkIdx(idx);
    // if (idx >= this.length || idx < 0) {
    //   throw new Error('Index is Invalid');
    // }
    return this.getNode(idx).val;
  }

  /** find node at index */

  getNode(idx) {
    let currNode = this.head;
    let count = 0;

    while (currNode !== null && count != idx) {
      count++;
      currNode = currNode.next;
    }

    return currNode;
  }

  checkIdx(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error('Index is Invalid');
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this.checkIdx(idx);
    let currNode = this.getNode(idx);
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error('Index is Invalid');
    }

    /** insert at the head */
    if (idx === 0) return this.unshift(val);

    /** insert at the tail */
    if (idx === this.length) return this.push(val);

    let prev = this.getNode(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // if (idx >= this.length || idx < 0) {
    //   throw new Error('Index is invalid');
    // }

    this.checkIdx(idx);
    // remove head

    if (idx === 0) {
      let delHead = this.head.val;
      this.head = this.head.next;
      this.length--;
      if (this.length < 2) {
        this.tail = this.head;
      }
      return delHead;
    }

    // remove tail

    let prev = this.getNode(idx - 1);

    if (idx === this.length - 1) {
      let delTail = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length--;
      return delTail;
    }

    // remove item in middle of list

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    //Add up the nodes and divide by the length
    let total = 0;
    let currNode = this.head;

    while (currNode) {
      total += currNode.val;
      currNode = currNode.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
