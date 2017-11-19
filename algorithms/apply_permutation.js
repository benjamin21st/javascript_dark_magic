/**
 * EPI 5.10
 */
function applyPermutation(A, P) {
  let idx = 0;
  let lastIdx = A.length - 1;

  while (idx <= lastIdx) {
    if (P[idx] === idx) {
      ++idx;
    } else {
      let target = P[idx];
      swap(A, idx, target);
      swap(P, idx, target);
    }
  }
}

function swap(A, i, j) {
  let t = A[i];
  A[i] = A[j];
  A[j] = t;
}

console.log('Run: testApplyPermutation(A, P)');

function testApplyPermutation(A, P) {
  if (!A || !P) {
    A = [1, 3, 2, 0];
    P = [2, 1, 3, 0]; let expect = [0, 3, 1, 2]; applyPermutation(A, P); console.assert(JSON.stringify(A) === JSON.stringify(expect)); console.log('Result: ', A); } else { applyPermutation(A, P); console.log('Result: ', A);
  }
}
