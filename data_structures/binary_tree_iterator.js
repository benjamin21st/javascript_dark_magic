class InorderIterator {
  constructor(node) {
    this.prev = null;
    this.curr = node;
  }

  hasNext() {
   return this.curr !== null;
  }

  next() {
    let next = null;
    let foundNext = false;

    while (!foundNext) {
      if (!this.curr) { return null; }

      if (this.prev === this.curr.parent) {
        // came from the top
        // go left if we have left
        if (this.curr.left) {
          next = this.curr.left;
        } else {
          // this is the left most
          foundNext = true;
          next = this.curr.right || this.curr.parent;
        }
      } else if (this.prev === this.curr.left) {
        // came from the left
        // go right if we have any
        foundNext = true;
        next = this.curr.right || this.curr.parent;
      } else { // this.prev === this.curr.right
        // came from the right, ignore because curr node
        // is already visited and recorded, and it is not
        // considered as a "new" node
        next = this.curr.parent;
      }

      this.prev = this.curr;
      this.curr = next;
    }

    return this.prev;
  }
}

console.log('Run: testInorderIterator');

function testInorderIterator() {
  let root = new TreeNode('D');
  root.parent = null;

  root.left = new TreeNode('B');
  root.left.parent = root;

  root.right = new TreeNode('E');
  root.right.parent = root;

  root.left.left = new TreeNode('A');
  root.left.left.parent = root.left;

  root.left.right = new TreeNode('C');
  root.left.right.parent = root.left;

  let it = new InorderIterator(root.left.left);
  while(it.hasNext()) {
    console.log(it.next());
  }
}

