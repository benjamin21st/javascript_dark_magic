class StackQueue {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error('Queue capacity has to be >= 1');
    }
    this.capacity = capacity;
    this.insertStack = [];
    this.popStack = [];
  }

  insert(element) {
    if (this.insertStack.length + this.popStack.length === this.capacity) {
      throw new Error('Queue is full, pop a thing or two to make more room');
    }
    this.insertStack.push(element);
  }

  moveBetweenStacks() {
    while (this.insertStack.length) {
      // TODO: this is not really stack API, just JS array
      let top = this.insertStack[this.insertStack.length - 1];
      this.insertStack.pop();
      this.popStack.push(top);
    }
  }

  popFront() {
    if (!this.popStack.length) {
      this.moveBetweenStacks();

      if (!this.popStack.length) {
        throw new Error('No more elements to pop!');
      }
    }

    this.popStack.pop();
  }

  peek() {
    if (!this.popStack.length) {
      this.moveBetweenStacks();

      if (!this.popStack.length) {
        throw new Error('No more elements to peek!');
      }
    }

    return this.popStack[this.popStack.length - 1];
  }
}

console.log('Run: testStackQueue to see test simulation of some operations');
function testStackQueue() {
  let sq = new StackQueue(3);
  sq.insert(1);
  console.assert(sq.peek() === 1);
  sq.insert(2);
  sq.insert(3);
  sq.popFront(); // expect to remove 1
  console.assert(sq.peek() === 2);
  // now count is 2
  sq.insert(4);
  try {
    sq.insert(5); // expect to throw
    console.assert(false, true, 'Should throw, capacity overflow');
  } catch (err) {};
}
