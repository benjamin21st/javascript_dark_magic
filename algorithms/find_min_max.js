/**
 * EPI: 11.7
 */
class MinMax {
  constructor(a, b) {
    if (a >= b) {
      this.max = a;
      this.min = b;
    } else {
      this.max = b;
      this.min = a;
    }
  }
}

function findMinMax(A) {
  if (!A.length) { return null; }

  let globalMinMax = new MinMax(A[0], A[0]);

  for (let i = 0; i + 1 < A.length; i += 2) {
    let minMax = new MinMax(A[i], A[i + 1]);

    globalMinMax.min = Math.min(globalMinMax.min, minMax.min);
    globalMinMax.max = Math.max(globalMinMax.max, minMax.max);
  }

  if (A.length % 2) {
    globalMinMax.min = Math.min(globalMinMax.min, A[A.length - 1]);
    globalMinMax.max = Math.max(globalMinMax.max, A[A.length - 1]);
  }

  return globalMinMax;
}

console.log('Run: testFindMinMax(A)');

function testFindMinMax(A) {
  if (!A) {
    A = [1, 2, 3, 2, 4, 1, 5, 6, 1, 0, 8, 10];
  }

  let expectMin = Math.min.apply(this, A);
  let expectMax = Math.max.apply(this, A);
  let res = findMinMax(A);

  console.assert(res.min === expectMin);
  console.assert(res.max === expectMax);
}
