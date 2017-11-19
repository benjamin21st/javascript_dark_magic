/**
 * EPI: 9.13
 */
function reconstructTreeWithMarkers(A) {
  let pointer = { idx: 0 };
  return reconstructTreeHelper(A, pointer);
}

function reconstructTreeHelper(A, pointer) {
  if (pointer.idx >= A.length) { return; }

  let treeKey = A[pointer.idx];
  ++pointer.idx;

  if (treeKey === null) {
    return null;
  }

  let leftSubTree = reconstructTreeHelper(A, pointer);
  let rightSubTree = reconstructTreeHelper(A, pointer);

  let treeNode = new TreeNode(treeKey);
  treeNode.left = leftSubTree;
  treeNode.right = rightSubTree;

  return treeNode;
}

function reconstructTreeIteratively(A) {
  let root = new TreeNode(A[0]);
  let stack = [root];

  for (let i = 1; i < A.length; ++i) {
    if (A[i] === null) {
      let last = stack[stack.length - 1];

      if (!last) {
        stack.pop();
        stack.pop();
      } else if (last.left) {
        stack.pop(); // there is already a left, and this null is right, pop!
      } else {
        stack.push(null);
      }
    } else {
      let newNode = new TreeNode(A[i]);
      let parent = stack[stack.length - 1];

      if (!parent) { // this null is a parent's left node actually
        stack.pop();
        parent = stack[stack.length - 1];
        parent.right = newNode;
      } else if (!parent.left) { // set left child first
        parent.left = newNode;
      } else if (!parent.right) {
        parent.right = newNode;
      } else { // parent is full of children, pop out and offset counter
        stack.pop();
        --i;
        continue;
      }
      stack.push(newNode); // always remember to push newNode onto stack
    }
  }

  return root;
}

console.log('Run: testReconstructTreeWithMarkers(A)')

function testReconstructTreeWithMarkers(A) {
  if (!A) {
    A = ['H', 'B', 'F', null, null, 'E', 'A', null, null, null,
         'C', null, 'D', null, 'G', 'I', null, null, null];
  }
  let tree = reconstructTreeWithMarkers(A);
  let treeIter = reconstructTreeIteratively(A);
  console.assert(TreeNode.equals(tree, treeIter));
  console.log('Recursive:', tree);
  console.log('Iterative:', treeIter);
}
