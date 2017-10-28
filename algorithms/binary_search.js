function divideInt(a, b) {
  return Math.floor(a/b);
}

// TODO: write more test cases
function binarySearch(arr, target) {
  var left = 0, right = arr.length, mid;
  while (left <= right) {
    mid = left + divideInt(right - left, 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else if (arr[mid] === target) {
      return mid;
    } else { // arr[mid] > target
      right = mid - 1;
    }
  }

  return -1;
}

/**

 1, 2
 1, 2, 3
 1, 2, 3, 4
 1, 2, 3, 4, 5

 */
function sqrt(x) {
  if (x <= 0) { return 0; }
  // because case of 0 is handled above
  var left = 1, right = x, mid, xOverMid;
  while (true) {
    mid = left + divideInt(right - left, 2);
    xOverMid = divideInt(x, mid);
    console.log(left, mid, right, xOverMid);
    if (mid <= xOverMid) {
      if (mid + 1 > divideInt(x, mid + 1)) {
        return mid;
      }
      left = mid + 1;
    } else { // mid > xOverMid
      right = mid - 1;
    }
  }

  return mid;
}

function testSqrt() {
  var testCases = [
    { input: -1, expect: 0 },
    { input: 0, expect: 0 },
    { input: 1, expect: 1 },
    { input: 2, expect: 1 },
    { input: 3, expect: 1 },
    { input: 4, expect: 2 },
    { input: 5, expect: 2 },
    { input: 9, expect: 3 },
    { input: 15, expect: 3 }
  ];

  for (var i = 0; i < testCases.length; ++i) {
    var input = testCases[i].input,
        expect = testCases[i].expect,
        res = sqrt(input);
    console.log('Input:', input, 'expect:', expect, 'res:', res);
    console.assert(res === expect);
  }
}

// testSqrt();
