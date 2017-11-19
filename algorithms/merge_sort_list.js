/* globals ListNode */
/**
 * time: O(nlogn) for typical merge sort, but here since
 *       getting the mid point is not O(1) operation, it may
 *       take longer
 */
function mergeSortList(L) {
  if (!L || !L.next) {
    // no need to "sort", just 0 or 1 element
    return L;
  } else {
    // divide-conquer, find mid node, and recursively
    // sort left-half, right-half, then merge together
    let slow = L, fast = L;
    while (fast.next && fast.next.next) {
      // When fast reaches the end, slow is at mid point
      slow = slow.next;
      fast = fast.next.next;
    }
    // detach slow, then sort each, then merge
    let next = slow.next;
    slow.next = null; // detach first half
    let sortedLeft = mergeSortList(L);
    let sortedRight = mergeSortList(next);
    return mergeLists(sortedLeft, sortedRight);
  }
}

function mergeLists(L, R) {
  let dummy = new ListNode(null);
  let node = dummy;

  while (L && R) {
    if (L.val <= R.val) {
      node.next = L;
      L = L.next;
    } else {
      node.next = R;
      R = R.next;
    }
    node = node.next;
  }

  // Either L or R must have ended
  if (L) {
    node.next = L;
  } else {
    node.next = R;
  }

  // node now points to the tail
  // dummy's next should be the first valid node
  return dummy.next;
}

console.log('Run: testMergeSortLists()')

function testMergeSortLists() {
  let list = new ListNode(null);
  let iter = list;
  let A = [1, 3, 2, 0, 5, 4];

  for (let val of A) {
    iter.next = new ListNode(val);
    iter = iter.next;
  }

  let sortedList = mergeSortList(list.next);
  sortedList.printList();
}
