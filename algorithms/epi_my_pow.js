/**
 * Raise x to the power of y
 * @param {*} x
 * @param {*} y
 */
function myPow(x, y) {
  if (x === 0 || x === 1) { return x; }
  if (y === 0) { return 1; }
  if (y < 0) {
    return myPow(1/x, -y);
  }
  let res = 1;
  while (y) {
    if (y & 1) {
      res *= x;
    }
    x *= x;
    y >>= 1;
  }
  return res;
}

console.log('Run: testMyPow() to see results print out')
function testMyPow() {
  console.log('myPow(2, 3)', myPow(2, 3))
  console.log('myPow(2, -3)', myPow(2, -3))
  console.log('myPow(0, 1)', myPow(0, 1))
  console.log('myPow(3, 0)', myPow(3, 0))
}