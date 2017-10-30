function trappingWater(A) {
  let i = 0, j = A.length - 1;
  let max = 0;

  while (i < j) {
    let width = j - i;
    max = Math.max(max, width * Math.min(A[i], A[j]));

    if (A[i] > A[j]) {
      --j;
    } else {
      ++i;
    }
  }

  return max;
}

function trappingWaterSlow(A) {
  let max = 0;
  let lastIdx = A.length - 1;
  for (let i = 0; i <= lastIdx; ++i) {
    for (let j = i; j <= lastIdx; ++j) {
      let area = Math.min(A[i], A[j]) * (j - i);
      max = Math.max(max, area);
    }
  }
  return max;
}

console.log('Run: testTrappingWater(A) to check')
function testTrappingWater(A) {
  A = A || [0, 1, 3, 2, 4, 1, 0];

  console.assert(trappingWater(A) === trappingWaterSlow(A));
}