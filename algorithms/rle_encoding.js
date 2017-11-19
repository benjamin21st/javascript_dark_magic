/**
 * EPI: 6.12
 */
function RLEencode(s) {
  let res = '';
  let idx = 0;

  while (idx < s.length) {
    let cnt = 1;
    let chr = s[idx];

    while (++idx < s.length && s[idx] === chr) {
      ++cnt;
    }

    res += cnt.toString() + chr;
  }

  return res;
}

function RLEencodeTextbook(s) {
  let res = '';

  for (let i = 1, count = 1; i <= s.length; ++i) {
    if (i === s.length || s[i] !== s[i - 1]) {
      res += count.toString() + s[i - 1];
      count = 1;
    } else {
      ++count;
    }
  }

  return res;
}

function RLEdecode(s) {
  let nums = new Set();

  for (let i = 0; i < 10; ++i) { nums.add(i.toString()); }

  let res = '';
  let idx = 0;

  while (idx < s.length) {
    let cnt = '';

    while (idx < s.length && nums.has(s[idx])) {
      cnt += s[idx++];
    }

    res += multiplyChar(s[idx++], parseInt(cnt));
  }

  return res;
}

function multiplyChar(chr, count) {
  let res = '';
  while (count--) {
    res += chr;
  }
  return res;
}

console.log('Run: RLEencode(s) or RLEdecode(s)');

