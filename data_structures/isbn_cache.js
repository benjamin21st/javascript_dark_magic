class Book {
  constructor (ISBN, price) {
    this.ISBN = ISBN;
    this.price = price;
    this.next = null;
    this.prev = null;
  }
}

class BookCache {
  constructor (capacity) {
    this.capacity = capacity;
    this.books = new Map();
    this.size = 0;
    this.listHead = null;
    this.listTail = null;
  }

  add (ISBN, price) { // book is a node
    let book = new Book(ISBN, price);

    this.books.set(ISBN, book);
    this.append(book);

    ++this.size;
    if (this.size > this.capacity) {
      this.listHead = this.listHead.next; // removing oldest entry
      this.listHead.prev = null; // clear head's ghost references
      --this.size;
    }
  }

  append (node) {
    if (!this.listTail) {
      this.listTail = node;
    } else {
      this.listTail.next = node;
      node.prev = this.listTail;
      this.listTail = node;
    }
    if (!this.listHead) {
      this.listHead = node;
    }
  }

  delete (ISBN) {
    let node = this.books.get(ISBN);
    if (node) {
      this.detach(node);
      this.books.delete(ISBN);
      --this.size;
    }
  }

  detach (node) {
    if (!node.prev && !node.next) {
      // do nothing, this node is an orphan
    } else if (!node.prev) {
      // this node is head
      node.next.prev = null;
      node.next = null;
    } else if (!node.next) {
      // this node is tail
      node.prev.next = null;
      node.prev = null;
    } else {
      // this node has prev, next
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  update (ISBN, price) {
    let node = this.books.get(ISBN);
    if (node) {
      node.price = price;
      // move to most recent
      this.detach(node);
      this.append(node);
    }
  }

  getPriceByISBN (ISBN) {
    let node = this.books.get(ISBN);
    if (node) {
      return node.price;
    } else {
      return null;
    }
  }
}

console.log('Run: (new BookCacheTest).runTests() to test')
class BookCacheTest {
  runTests () {
    let capacity = 5;
    let cache = new BookCache(capacity);;
    cache.add('x1', 9.99);
    console.assert(cache.size === 1);
    console.assert(cache.getPriceByISBN('x1') === 9.99);
    cache.add('x2', 19.99);
    console.assert(cache.size === 2);
    console.assert(cache.getPriceByISBN('x2') === 19.99);
    cache.add('x3', 1.99);
    cache.add('x4', 12.99);
    cache.add('x5', 11.99);
    cache.add('x6', 2.99); // this should cause a purging of cache
    console.assert(cache.size === capacity);
    cache.update('x4', 2.99);
    console.assert(cache.getPriceByISBN('x4') === 2.99);
    console.assert(cache.listTail.ISBN === 'x4');
  }
}