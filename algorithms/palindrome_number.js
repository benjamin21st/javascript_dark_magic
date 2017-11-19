function isNumPalindrome(num) {
  if (num < 0) { return false; }
  if (num < 10) { return true; }

  let least, most, base, mask;
  while (num >= 10) {
    least = num % 10;
    base = Math.floor(Math.log10(num));
    mask = Math.pow(10, base);
    most = Math.floor(num / mask);

    if (least !== most) {
      return false;
    }

    num = num % mask;
    num = Math.floor(num / 10);
  }

  return true;
}

console.log('Run: testIsNumPalindrome(num)');

function testIsNumPalindrome(num) {
  if (num) {
    let numStr = num.toString();
    let isPalin = (numStr === numStr.split('').reverse().join(''));
    console.assert(isNumPalindrome(num) === isPalin);
  } else {
    let testCases = [
      [7, true],
      [11, true],
      [-7, false],
      [121, true],
      [13, false]
    ];
    for (let tcase of testCases) {
      console.assert(isNumPalindrome(tcase[0]) === tcase[1])
    }
  }
}
