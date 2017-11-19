// for the moment, assume class ListNode is in global space

/**
 *
 * @param {*} list
 * @param {*} s start position
 * @param {*} f finish position
 */
function reverseSublist(list, s, f) {
  let start = 1;
  let dummy = new ListNode(null);
  dummy.next = list;
  let head = dummy;
  // find start node
  while (start++ < s) {
    head = head.next;
  }

  let iter = head.next;

  while (s++ < f) {
    let tmp = iter.next;
    iter.next = tmp.next; // break up link btw iter and tmp, tmp is now floating around like a ghost
    tmp.next = head.next; // tmp now says, "hey iter, how dare you kick me out, i'm your boss now"
    head.next = tmp; // then head is like, "wowowo, wait a minute, I'm still the boss, you motherf*"
  }
  return dummy.next;
}

function TestReverseSublist (A) {
  A = A || [11, 3, 5, 7, 2];
  let list = new ListNode(null);
  let head = list;
  for (let num of A) {
    head.next = new ListNode(num);
    head = head.next;
  }
  list = list.next; // cuz list points to a dummy

  return {
    runTests: function () {
      reverseSublist(list, 2, 4);
      console.log(list);
    },
    list: list
  }
}