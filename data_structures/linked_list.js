class ListNode {
  constructor (val) {
    this.val = val;
    this.next = null;
  }
  printList () {
    let outStr = '';
    let head = this;
    while (head) {
      outStr += `${head.val}->`
      head = head.next;
    }
    outStr += 'null';
    console.log(outStr);
  }
}