/**
 * Create a random subset of size k from array A
 * where each element should be equally likely
 * @param {*} A
 * @param {*} k
 */
function swap (A, x, y) {
  let t = A[x];
  A[x] = A[y];
  A[y] = t;
}

function randomSubset(A, k) {
  if (k > A.length) return A;
  if (k === 0) return A;

  let len = A.length;
  let randIdx;
  let offset = 0;

  while (k) {
    randIdx = Math.floor(Math.random() * len);
    if (randIdx < offset) continue;
    else {
      swap(A, offset, randIdx);
      ++offset;
      --k;
    }
  }
  return A;
}

console.log('Run: testRandomSubset() to test')
function testRandomSubset () {
  let arr = [1, 2, 32, 3, 5, 6, 21, 22, 53, 76, 4];
  console.log(randomSubset(arr, 5))
  console.log(randomSubset(arr, 5))
  console.log(randomSubset(arr, 5))
}