/**
 * EPI: 9.16
 */
function nextSiblingTree(tree) {
  if (tree) {
    nextSiblingTreeHelper(tree.left, tree.right);
  }
  return tree;
}

function nextSiblingTreeHelper(left, right) {
  if (!left || !right) { return; }
  left.next = right;
  // console.log('Connecting: ', left.val, '-->', right.val);
  nextSiblingTreeHelper(left.left, left.right);
  nextSiblingTreeHelper(left.right, right.left);
  nextSiblingTreeHelper(right.left, right.right);
}

// Textbook solution
function rightSiblingTree(tree) {
  while (tree && tree.left) {
    connectNextLevelSiblings(tree);
    tree = tree.left;
  }
  return tree;
}

function connectNextLevelSiblings(tree) {
  let iter = tree;

  while (iter) {
    console.log(iter.left.val, '->', iter.right.val);
    iter.left.next = iter.right;

    if (iter.next) {
      iter.right.next = iter.next.left;
      console.log(iter.right.next.val, '->', iter.next.left.val);
    }

    iter = iter.next;
  }
}

console.log("Run: testNextSiblingTree(tree)")

function testNextSiblingTree(tree) {
  // Using algorithms/reconstruct_tree_with_markers.js
  let nodeVals = [1,
                    2,
                      4,
                        8, null, null,
                        9, null, null,
                      5,
                        10, null, null,
                        11, null, null,
                    3,
                      6,
                        12, null, null,
                        13, null, null,
                      7,
                        14, null, null,
                        15, null, null];

  console.log('Node vals are expected to be:', nodeVals);

  let root = reconstructTreeWithMarkers(nodeVals);
  console.log(nextSiblingTree(root));

  let root2 = reconstructTreeWithMarkers(nodeVals);
  console.log(rightSiblingTree(root2));
}
