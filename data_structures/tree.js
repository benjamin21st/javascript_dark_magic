class TreeNode {
  constructor (val) {
    this.val = val;
    this.left = this.right = null;
  }

  static equals(tree1, tree2) {
    if (!tree1 && !tree2) {
      return true;
    } else if (!tree1 || !tree2) {
      return false;
    } else if (tree1.val !== tree2.val) {
      return false;
    } else {
      return TreeNode.equals(tree1.left, tree2.left) &&
             TreeNode.equals(tree1.right, tree2.right);
    }
  }
}

// TODO: this could extend from TreeNode
class TreeNodeWithParent {
  constructor(val, parent) {
    this.val = val;
    this.left = this.right = null;
    this.parent = parent;
  }
}
