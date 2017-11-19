function multiplyNumArray(A, B) {
  let res = (new Array(A.length + B.length)).fill(0);
  let sign = A[0] * B[0] < 0 ? -1 : 1;

  for (let i = A.length - 1; i >= 0; --i) {
    for (let j = B.length - 1; j >= 0; --j) {
      let idx = i + j + 1;
      let product = Math.abs(A[i] * B[j]);

      res[idx] += product;
      if (res[idx] >= 10) {
        res[idx - 1] += Math.floor(res[idx]/10);
        res[idx] %= 10;
      }
    }
  }

  if (res[0] === 0) {
    res = res.slice(1);
  }

  res[0] *= sign;
  return res;
}

console.log('Run: testMultiplyNumArray(A, B)');
function testMultiplyNumArray(A, B) {
  if (!A || !B) {
    let tests = [
      { A: [-2, 1],
        B: [1, 1, 0],
        expect: [-2, 3, 1, 0] },

      { A: [2, 1],
        B: [1, 0, 5],
        expect: [2, 2, 0, 5] },

      { A: [9, 9],
        B: [9, 9],
        expect: [9, 8, 0, 1] },
    ];
    for (let tcase of tests) {
      let res = multiplyNumArray(tcase.A, tcase.B);
      let expect = tcase.expect;
      console.assert(expect.join('') === res.join(''));
    }
  } else {
    let res = multiplyNumArray(A, B);
    let expect = (parseInt(A.join('')) * parseInt(B.join(''))).toString();
    console.assert(expect === res.join(''));
  }
}
