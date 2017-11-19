function withinTolerance(x, y, tolerance) {
  return Math.abs(x * x - y) <= tolerance;
}

function sqrtReal(n, tolerance) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  tolerance = tolerance || 0.001;
  let left, right;

  if (n < 1) {
    left = 0, right = 1;
  } else { // n > 1
    left = 1, right = n;
  }

  while (left < right) {
    let mid = left + (right - left) / 2;
    if (withinTolerance(mid, n, tolerance)) {
      return mid;
    } else if (mid * mid > n) {
      right = mid;
    } else {
      left = mid;
    }
  }

  throw new ValueError('Execution should not have reached here');
}

console.log('Run: testSqrtReal(n)');

function testSqrtReal(tolerance) {
  console.log('sqrtReal(1):', sqrtReal(1, tolerance));
  console.log('sqrtReal(0.25):', sqrtReal(0.25, tolerance));
  console.log('sqrtReal(0.09):', sqrtReal(0.09, tolerance));
  console.log('sqrtReal(1.69):', sqrtReal(1.69, tolerance));
  console.log('sqrtReal(4):', sqrtReal(4, tolerance));
}
