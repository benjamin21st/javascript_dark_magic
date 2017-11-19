function testCyclity(list) {
  if (!list) return null;
  let slow = list, fast = list.next; // make sure fast and slow doesn't start at the same value
  while (fast !== null && fast.next !== null && fast.val !== slow.val) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast === null || fast.next === null) return null; // no cycle
  // slow and fast now point to the same node they overlap
  let len = 1;
  fast = fast.next;
  while (fast.val !== slow.val) {
    fast = fast.next;
    ++len;
  }
  // go back to begining and advance fast by len
  slow = list, fast = list;
  while (len--) {
    fast = fast.next;
  }
  while (slow.val !== fast.val) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

function testCyclityConcise(head) {
  if (!head) return null;
  let fast = slow = head;
  let entry = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast.val === slow.val) {
      while (slow.val !== entry.val) {
        slow = slow.next;
        entry = entry.next;
      }
      return entry;
    }
  }
  return null;
}

function testTestCyclity() {
  let root = new ListNode(1);
  root.next = new ListNode(2);
  root.next.next = new ListNode(3);
  root.next.next.next = root.next;
  console.log('The cyclical list is: ', root)
  console.log(testCyclity(root));
}