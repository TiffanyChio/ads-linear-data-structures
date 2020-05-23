class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;

      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
    this.counter = 0
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const first_node = this._head();

    const new_node = new DLLNode({ 
      element: element, 
      next: first_node,
      prev: this._sentinel
    });

    this._sentinel.next = new_node;
    first_node.prev = new_node;

    this.counter += 1;

    return new_node;
  }

  insertTail(element) {
    const last_node = this._tail();

    const new_node = new DLLNode({ 
      element: element, 
      next: this._sentinel,
      prev: last_node
    });

    this._sentinel.prev = new_node;
    last_node.next = new_node;

    this.counter += 1;

    return new_node;
  }

  removeHead() {
    if (this.counter === 0) {
      return undefined;
    }

    const removed_node = this._head();
    removed_node.remove();
    this.counter -= 1;

    return removed_node.element;
  }

  removeTail() {
    if (this.counter === 0) {
      return undefined;
    }

    const removed_node = this._tail();
    removed_node.remove();
    this.counter -= 1;

    return removed_node.element;
  }

  remove(node) {
    if (!node || !node._active) {
      return;
    }

    this.counter -= 1;

    return node.remove();
  }

  forEach(callback, whateverThisIs = this) {
    let i = 0;
    let curr = this._head();

    while (curr !== this._sentinel) {
      callback(curr.element, i, whateverThisIs);
      i += 1
      curr = curr.next;
    }

    return
  }

  count() {
    return this.counter;
  }
}

export default DoublyLinkedList;