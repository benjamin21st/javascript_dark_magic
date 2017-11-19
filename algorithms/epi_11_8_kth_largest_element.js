/**
 * Many ways and their time complexity:
 *  - sort(), and the A[k - 1]: O(nlogn)
 *    - unless we use counting sort: O(n)
 *  - maxHeap, still O(nlogn), O(logn) for each insertion
 *    and O(n) loop through all element
 *  - partition, discarding the wrong half each time
 *    O(n) best case, O(n^2) worst case
 * @param {*} A
 */
class FindKthLargest {
  findKthLargest (A, k) {
    // This implementation uses the partitioning method, and use O(n) space
    let len = A.length;
    let aux = new Array(len);
    let pivot = A[this.randomGen(0, len)];
    let idx = Infinity; // final position after partitioning
    while (idx !== k - 1) {
      idx = this.partition(A, pivot, aux)
      if (idx < k - 1) {
        // meaning our aux[idx] is bigger than it should be
        // so we need to pick a number between aux[idx:aux.length - 1]
        pivot = aux[this.randomGen(idx, len)];
      } else {
        // meaning our aux[idx] is smaller than it should be
        // so we need to pick between aux[0:idx]
        pivot = aux[this.randomGen(0, idx)];
      }
    }
    return aux[idx];
  }

  partition (A, pivot, aux) {
    let left = 0, right = aux.length - 1;
    for (let i = 0; i < A.length; ++i) {
      if (A[i] > pivot) {
        aux[left++] = A[i];
      } else if (A[i] < pivot) {
        aux[right--] = A[i];
      }
    }
    aux[left] = pivot;
    return left;
  }

  randomGen(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
  }

  runTests () {
    let A = [3, 2, 1, 5, 4];
    console.log('For input array: ', A)
    let nth_1 = this.findKthLargest([3, 2, 1, 5, 4], 1);
    console.log('1st largest elemnt is: ', nth_1)
    console.assert(nth_1, 5);
    let nth_2 = this.findKthLargest([3, 2, 1, 5, 4], 2);
    console.log('2th largest elemnt is: ', nth_2)
    console.assert(nth_2, 4);
    let nth_4 = this.findKthLargest([3, 2, 1, 5, 4], 4);
    console.log('4th largest elemnt is: ', nth_4)
    console.assert(nth_4, 2);
  }
}

console.log('run: (new FindKthLargest()).runTests() to test')