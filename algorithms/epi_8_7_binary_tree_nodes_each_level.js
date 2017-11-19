function binaryTreeNodesOnEachLevel (root) {
  let res = [];
  if (!root) return res;
  let Q = [root];
  while (Q.length) {
    res.push([...Q]);
    let tQ = [];
    while (Q.length) {
      let node = Q.shift(); // queue
      if (node.left) tQ.push(node.left);
      if (node.right) tQ.push(node.right);
    }
    Q = tQ;
  }
  return res;
}

console.log('Run: testBinaryTreeNodesOnEachLevel() to test')
function testBinaryTreeNodesOnEachLevel () {
  let root = new TreeNode(314);
  root.left = new TreeNode(5);
  root.right = new TreeNode(6);
  console.log(binaryTreeNodesOnEachLevel(root));
}
