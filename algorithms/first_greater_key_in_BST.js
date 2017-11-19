/* globals: TreeNode */

class BinarySearchTree {
  constructor (sortedArr) {
    if (!sortedArr.length) return null;
    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
  }
  buildTree(A, left, right) {
    if (left > right) return null;
    else {
      let mid = left + Math.floor((right - left)/2);
      let node = new TreeNode(A[mid]);
      node.left = this.buildTree(A, left, mid - 1);
      node.right = this.buildTree(A, mid + 1, right);
      return node;
    }
  }
}

function findFirstGreaterKeyInBST (bst, val) {
  if (!bst) {
    return null;
  }
  let foundKey;
  if (val < bst.val) {
    foundKey = findFirstGreaterKeyInBST(bst.left, val);
    if (foundKey === null) return bst.val;
  } else {
    foundKey = findFirstGreaterKeyInBST(bst.right, val);
    return foundKey;
  }
}

function findFirstGreaterKeyConcise (bst, val) {
  let firstSoFar = null;
  while (bst) {
    if (bst.val > val) {
      firstSoFar = bst.val;
      bst = bst.left;
    } else {
      bst = bst.right;
    }
  }
  return firstSoFar;
}

console.log('Run: testFindFirstGreaterKeyInBST() to test')
function testFindFirstGreaterKeyInBST () {
  let tree = new BinarySearchTree([1, 2, 3, 4, 5]);
  let gtr_2 = findFirstGreaterKeyInBST(tree.root, 2);
  console.log('First greater than 2 is:', gtr_2);
  console.assert(gtr_2, 3);

  let gtr_4 = findFirstGreaterKeyInBST(tree.root, 4);
  console.log('First greater than 2 is:', gtr_4);
  console.assert(gtr_4, 5);
}