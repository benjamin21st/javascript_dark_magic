/**
 * Takes two DOMNodes and create iterators for each of them
 * and then iteratively compare their "next" node until
 * one iterator stops and the other still running, or that
 * one's textContent doesn't match that of the other's
 */
function compareNodes (node1, node2) {
  return cmpIter(node1, node2, 0, 0);
}

/**
 * Time complexity: O(min(n1, n2)) * O(k) * O(logm + h)
 *   Traversing all the nodes should be bounded by the root
 *   with fewer nodes (iterator stops when one of the node
 *   is null);
 *
 *   Each comparison checks if one string is a substring of
 *   the other, assume average O(k) time for this comparison
 *
 *   Each comparison also needs to call "nextNode" below,
 *   which takes O(logm + h) where m is average children
 *   count and h is the node's depth
 *
 * Space complexity: O(k)
 *   here we compare a substring of it1's content with a
 *   substring of it2's content
 *   The space complexity could be avoided by manually
 *   looping from idx1 or idx2 to compare the characters,
 *   which would take the same amount of time but O(1) space
 */
function cmpIter(it1, it2, idx1, idx2) {
  // check if one is substr of the other
  // make sure it1 is short
  if (!it1 && !it2) {
      return true; // if it1 and it2 becomes null at the same time
  } else if (!it1 || !it2) {
      return false; // if only one of the iterators terminated
  }

  let s1 = it1.getContent().slice(idx1);
  let s2 = it2.getContent().slice(idx2);

  // if comparable content of each node is not the substring
  // of the other
  if (s1.indexOf(s2) < 0 && s2.indexOf(s1) < 0) {
      return false;
  } else {
      if (s1.length === s2.length) {
        // advance both iterators, and reset both index
        return cmpIter(nextNode(it1), nextNode(it2), 0, 0);
      } else if (s1.length > s2.length) {
        // s1 is longer, so advance it2's to its next
        // increment it1's index by s2's length
        return cmpIter(it1, nextNode(it2), idx1 + s2.length, 0);
      } else { // s1.length < s2.length
        // similar as above, except in reverse
        return cmpIter(nextNode(it1), it2, 0, idx2 + s1.length);
      }
  }
}

/**
 * Goal is to find next or null
 * Time complexity: O(logn + h)
 *   bounded by the bigger of the time to search through
 *   child nodes and the time to traverse back up and get
 *   parent
 * Space complexity: O(1), only constant time allocated
 */
function nextNode(node) {
  if (node.children.length) {
    // use binary search to make this search quicker
    let left = 0, right = node.children.length - 1;

    // if the last child is visited, skip the check for other
    // children
    if (!node.children[right].visited) {
      while (left < right) {
        let mid = left + Math.floor((right - left)/2);
        if (node.children[mid].visited) {
          // then all children left of mid should be visited
          left = mid + 1;
        } else {
          // mid could be a candidate, so we do not exclude
          right = mid;
        }
      }
      if (!node.children[right].visited) {
        return node.children[right];
      }
    }
  }

  // all child nodes are visited, we mark this parent
  node.visited = true;

  // if node has been visited, or that node has no children
  // or that node's children have all been visited
  let iter = node;
  while (iter.parent && iter.parent.visited) {
    // we could unset "visited" here I guess .... maybe not
    iter = iter.parent;
  }

  // this will hoist to the highest parent currently
  // visited, then try asking that parent for next
  if (iter.parent) {
    return nextNode(iter.parent);
  } else {
    // this node is already root, no parent to ask for next
    return null;
  }
}

class DOMNode {
  constructor(text, parent) {
    this.text = text;
    this.parent = parent || null;
    this.children = [];

    if (this.parent) {
      this.parent.children.push(this);
    }
  }

  static fromObj(obj) {
    if (!obj) {
      throw 'obj is required!';
    }
    // default if not present
    obj.text = obj.text || '';
    obj.children = obj.children || [];

    let root = new DOMNode(obj.text);
    let dataStack = [obj];
    let nodeStack = [root];

    while (dataStack.length) {
      let data = dataStack.pop();
      let iter = nodeStack.pop();

      if (data.children) {
        for (let child of data.children) {
          let childNode = new DOMNode(child.text, iter);

          dataStack.push(child);
          nodeStack.push(childNode);
        }
      }
    }

    return root;
  }

  getContent() {
    return this.text;
  }
}

console.log('Run: testDOMIterator() to test');
function testDOMIterator () {
  // simple case, the first node contains all content there is
  let data1 = {
    text: "Hello World"
  };
  let data2 = {
    text: "Hello ",
    children: [
      {
        text: "W",
        children: [ { text: "orld" }, { text: "!" } ]
      }
    ]
  }
  let node1 = DOMNode.fromObj(data1);
  let node2 = DOMNode.fromObj(data2);

  console.log('node1:', node1, 'node2:', node2);
  console.assert(false === compareNodes(node1, node2));

  let nData1 = {
    text: "Hello ",
    children: [
      { text: "Wo" },
      { text: "rl", children: [
        { text: "d" }, { text: "!" }
      ]}
    ]
  }

  let nData2 = {
    text: "Hell", children: [
       { text: "o W", children: [
         { text: "orl", children: [
           { text: "d!" }
         ]}
       ]}
     ]
  };

  let newNode1 = DOMNode.fromObj(nData1);
  let newNode2 = DOMNode.fromObj(nData2);

  console.log('newNode1: ', newNode1, 'newNode2: ', newNode2);
  console.assert(true === compareNodes(newNode1, newNode2));
}
