function replaceRemove (str, end) {
  let s = str.split('');
  let next = s.length - 1;
  let iter = end;
  for (let i = s.length - 1; i >= 0; --i) {
    if (s[iter] !== 'a' && s[iter] !== 'b') {
      s[next--] = s[iter--];
    } else if (s[iter] === 'b') {
      --iter;
      s[next] = ' ';
    } else { // == 'a'
      s[next--] = 'd';
      s[next--] = 'd';
      --iter;
    }
  }
  return s.join('');
}

function testReplaceRemove () {
  let s = 'abac ';
  console.assert(replaceRemove(s, 3) === 'ddddc');
  s = 'cde';
  console.assert(replaceRemove(s, 2) === 'cde');
  s = 'b';
  console.assert(replaceRemove(s, 0) === ' ');
  s = 'acaa   ';
  console.assert(replaceRemove(s, 3) === 'ddcdddd');
  console.log('All tests passed')
}