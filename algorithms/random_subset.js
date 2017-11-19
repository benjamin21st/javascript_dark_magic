/**
 * EPI: 5.15
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

// function randomSubset(A, k) {
//   if (k > A.length) return A;
//   if (k === 0) return A;
//
//   let len = A.length;
//   let randIdx;
//   let offset = 0;
//
//   while (k) {
//     randIdx = Math.floor(Math.random() * len);
//     if (randIdx < offset) continue;
//     else {
//       swap(A, offset, randIdx);
//       ++offset;
//       --k;
//     }
//   }
//   return A;
// }

function randomSubset(A, k) {
  let idx = 0, len = A.length;

  while (idx < k) {
    let rand = Math.floor(Math.random() * (len - idx));
    let t = A[idx];
    A[idx] = A[rand];
    A[rand] = t;

    ++idx;
  }

  return A.slice(0, k);
}

console.log('Run: testRandomSubset() to test')
function testRandomSubset (A, k) {
  if (!A || !k) {
    A = [1, 2, 32, 3, 5, 6, 21, 22, 53, 76, 4];
    console.log(randomSubset(A, 5))
    console.log(randomSubset(A, 5))
    console.log(randomSubset(A, 5))
  } else {
    console.log(randomSubset(A, k));
  }
}

