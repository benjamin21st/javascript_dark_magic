import { TreeNode } from './tree';

// This is just copied from someone else
var serialize = function(root) {
  function traverse(node) {
      if (!node) {
          return [];
      }
      return [node.val].concat(traverse(node.left), traverse(node.right));
  }
  return JSON.stringify(traverse(root));
};

var deserialize = function(data) {
  function construct(arr) {
      if (!arr.length) {
          return null;
      }
      const root = new TreeNode(arr[0]);
      root.left = construct(arr.filter(num => num < root.val));
      root.right = construct(arr.filter(num => num > root.val));
      return root;
  }
  return construct(JSON.parse(data));
};