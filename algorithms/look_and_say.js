/**
 * Example:
 * input: 8
 * output: 1113213211
 * input: 4
 * output: 1211
 */

function lookAndSay(n) {
  let res = '1';

  while (n-- > 1) {
    let left = 0, right = res.length - 1;
    let num = res[left];
    let count = 0;
    let tmp = ``;

    while (left <= right) {
      if (num === res[left]) {
        ++count;
      } else {
        tmp += `${count}${num}`;
        num = res[left];
        count = 1; // reset num and count
      }

      if (left === right) {
        // we'll break from here, so push current count-num to res
        tmp += `${count}${num}`;
      }

      ++left; // because we need to use left, therefore modify it last
    }

    res = tmp;
  }

  return +res;
}

function lookAndSayImproved(n) {
  let res = '1';
  l
  for (let i = 1; i < n; ++i) {
    res = nextNumber(res);
  }
  return res;
}

function nextNumber(num) {
  let res = '';
  for (let i = 0; i < num.length; ++i) {
    let count = 1;
    while (i < num.length - 1 && num[i] === num[i + 1]) {
      ++count;
      ++i;
    }
    res += `${count}${num[i]}`;
  }
  return res;
}


console.log('Run: testLookAndSay(n) to test');
function testLookAndSay(n) {
  if (!n) n = 8;
  console.log(lookAndSay(n));
}
