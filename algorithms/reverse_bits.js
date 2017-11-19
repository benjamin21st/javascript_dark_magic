/*
 * input: (111000000000001)
 * output: (100000000000111)
 *
 * Time: O(n)
 * Space: O(1)
 */

function reverseBits(num) {
  // naive solution:
  // use a separate number initialized with num's LSB
  // then right shift num and left shift new num with
  // num's new LSB
  let res = num & 1 ? 1 : 0;
  while (num >>= 1) {
    res <<= 1; // left shift 1 regardless
    res |= (num & 1 ? 1 : 0);
  }
  return res;
}

/**
 * I must have done something wrong, the speed difference
 * is barely noticeable, not significant speed up when
 * there are lots of consecutive 0s
 */
function reverseBitsFast(num) {
  // Better solution:
  // skip 0s by a constant k
  // if not all 0s, then do 1 by 1 (can be improved)
  const k_ucharMax = 255;
  const k_int16Max = 32767;
  const k_uint16Max = 65535;

  const k_charMaskSize = 8;
  const k_int16MaskSize = 16;

  let res = 0;
  while (num) {
    if (num & k_uint16Max === 0) {
      // The problem asks for unsigned int
      res <<= k_int16MaskSize;
      num >>= k_int16MaskSize;
    } else if (num & k_ucharMax === 0) {
      res <<= k_charMaskSize;
      num >>= k_charMaskSize;
    } else {
      res <<= 1;
      res |= (num & 1 ? 1 : 0);
      num >>= 1;
    }
  }
  return res;
}


console.log('Run: testReverseBits(n)');
function testReverseBits(n) {
  console.log('Bit: ', n.toString(2));
  let t1, t2, t3, t4;

  t1 = window.performance.now();
  let res = reverseBits(n);
  t2 = window.performance.now();

  console.log('Reversed num:', res);
  console.log('Reversed bits:', res.toString(2));

  t3 = window.performance.now();
  let res2 = reverseBitsFast(n);
  t4 = window.performance.now();

  console.assert(res === res2);
  console.log('Reverse time:      ', t2 - t1);
  console.log('Reverse fast time: ', t4 - t3);
}
