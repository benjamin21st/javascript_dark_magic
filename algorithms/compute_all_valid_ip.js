/**
 * EPI 6.10
 */
function computeAllValidIP(s) {
  let res = [];
  computeAllValidIPHelper(s, 0, 0, res, []);
  return res;
}

function computeAllValidIPHelper(s, idx, group, res, curr) {
  if (idx >= s.length && group >= 4) {
    res.push(curr.slice(0));
  } else if (idx < s.length && group < 4) {
    let iMax = Math.min(s.length - idx, 3);

    for (let i = 1; i <= iMax; ++i) {
      if (i === 3) {
        let val = parseInt(s.substr(idx, 3))
        if (val > 255) { break; }
      } else if (i === 2 && s[idx] === '0') {
        // we don't want to have '00', and we need to break instead
        // of continue because the prevailing '0' will persist
        break;
      }
      computeAllValidIPHelper(s, idx + i, group + 1, res, curr.concat(s.substr(idx, i)));
    }
  }
}

console.log('Run: testComputeAllValidIP(s)');

function testComputeAllValidIP(s) {
  if (!s) {
    s = '19216811';
  }
  console.log(computeAllValidIP(s));
}
