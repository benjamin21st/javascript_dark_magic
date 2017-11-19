/**
 * EPI: 8.4
 */
function normalizePath(P) {
  let pArr = P.split('/');
  let res = [];

  for (let i = pArr.length - 1, skip = 0; i >= 0; --i) {
    pArr[i] = pArr[i].trim();
    if (pArr[i] === '..') {
      ++skip;
    } else if (pArr[i] === '.' || (i !== 0 && !pArr[i])) {
      // do nothing
    } else {
      if (skip) {
        --skip;
      } else {
        res.push(pArr[i]);
      }
    }
  }

  return res.reverse().join('/');
}

console.log('Run: testNormalizePath(P)')

function testNormalizePath(P) {
  if (!P) {
    let tests = [
      { tcase: './usr/../bin/gcc', expect: 'bin/gcc' },
      { tcase: './usr/bin/gcc', expect: 'usr/bin/gcc' },
      { tcase: './usr/ /local/..//../bin/gcc', expect: 'bin/gcc' },
      { tcase: '/usr/../bin/gcc', expect: '/bin/gcc' },
    ];

    for (let test of tests) {
      console.assert(normalizePath(test.tcase) === test.expect);
    }
  } else {
    console.log(normalizePath(P));
  }
}
