/**
 * EPI: 7.11
 */
function isListPalindrome(L) {
  let slow = L,
      fast = L;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let mid = slow;
  let midIter = mid.next,
      prev = mid;
  prev.next = null;

  while (midIter) {
    let temp = midIter.next;
    midIter.next = prev;
    prev = midIter;
    midIter = temp;
  }

  while (L && prev) {
    if (L.val !== prev.val) {
      return false;
    }
    L = L.next;
    prev = prev.next;
  }

  return true;
}

console.log('Run: testIsListPalindrome(L)');

function testIsListPalindrome(L) {
  if (!L) {
    let testCases = [
      { expect: true, data: [1, 2, 3, 2, 1] },
      { expect: true, data: [1, 2, 2, 1] },
      { expect: false, data: [1, 2, 3, 3, 1] },
      { expect: false, data: [1, 2, 3, 1] },
    ];

    for (let tcase of testCases) {
      let list = new ListNode(null);
      let head = list;

      for (let num of tcase.data) {
        head.next = new ListNode(num);
        head = head.next;
      }

      list = list.next;
      console.assert(isListPalindrome(list) === tcase.expect);
    }
  } else {
    console.log('isListPalindrome?:', isListPalindrome(L));
  }
}
