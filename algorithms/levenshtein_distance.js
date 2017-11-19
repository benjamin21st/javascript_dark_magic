let log = console.log;

function levenshteinDistance(s, t) {
  let cache = new Array(s.length);
  for (let i = 0; i < s.length; ++i) {
    cache[i] = (new Array(t.length)).fill(-1);
  }
  return levenshteinDistanceHelper(s, s.length - 1, t, t.length - 1, cache);
}

function levenshteinDistanceHelper(s, si, t, ti, cache) {
  if (si < 0) { return ti + 1; }
  else if (ti < 0) { return si + 1; }
  else {
    if (cache[si][ti] === -1) {
      // calculate new cache item
      if (s[si] === t[ti]) {
        cache[si][ti] = levenshteinDistanceHelper(s, si - 1, t, ti - 1, cache);
      } else {
        let sub = levenshteinDistanceHelper(s, si - 1, t, ti - 1, cache);
        let ins = levenshteinDistanceHelper(s, si, t, ti - 1, cache);
        let del = levenshteinDistanceHelper(s, si - 1, t, ti, cache);
        cache[si][ti] = Math.min(sub, ins, del) + 1;
      }
    }
    return cache[si][ti];
  }
}

/**
 * This is slow and I couldn't seem to figure out a way to optimize it.
 * @param {string} s
 * @param {string} t
 */
function levenshteinDistanceRec(s, t) {
  return levenshteinDistanceRecHelper(s, t, 0);
}

function levenshteinDistanceRecHelper(s, t, idx) {
  console.assert(s.substring(0, idx) === t.substring(0, idx));
  if (idx >= s.length) return t.length - idx;
  if (idx >= t.length) return s.length - idx;

  let res;
  if (s[idx] === t[idx]) {
    return levenshteinDistanceRecHelper(s, t, idx + 1);
  } else {
    let sub = levenshteinDistanceRecHelper(s.substring(0, idx) + t[idx] + s.slice(idx + 1), t, idx + 1);
    let ins = levenshteinDistanceRecHelper(s.substring(0, idx) + t[idx] + s.slice(idx), t, idx);
    let del = levenshteinDistanceRecHelper(s.substring(0, idx) + s.slice(idx + 1), t, idx);
    return Math.min(sub, ins, del) + 1;
  }
}

console.log('Run: testLevenshteinDistance (s, t) to test');

function testLevenshteinDistance(s, t) {
  s = s || 'Saturday';
  t = t || 'Sundays';
  let res = levenshteinDistance(s, t);
  console.log(res);
}


/**
 * A variation
 *
 * You have add/delete/move at your disposal, minimize the number
 * of operations it takes to change A into B
 */

function changeAtoBDP(A, B) {
    let steps = changeAtoBHelper(A, B, 0, 0)
    return steps;
}

function changeAtoBHelper(A, B, idx_A, idx_B) {
    // console.log(A, B, idx_A, idx_B);
    // base case
    if (idx_A >= A.length && idx_B >= B.length) {
        // both run out of elements
        return 0;
    } else if (idx_A >= A.length) {
        // we have extra elements in B
        return B.length - idx_B;
    } else if (idx_B >= B.length) {
        // we have extra elements in A
        return A.length - idx_A;
    }

    if (A[idx_A] === B[idx_B]) {
        return changeAtoBHelper(A, B, idx_A + 1, idx_B + 1);
    } else {
        let doDelete = changeAtoBHelper(A, B, idx_A + 1, idx_B);
        let doAdd = changeAtoBHelper(A, B, idx_A, idx_B + 1);

        let extraOp = 0; // 1
        for (let i = idx_B + 1; i < B.length; ++i) {
            if (B[i] === A[idx_A]) {
                console.log('we can move to', i)
                // if we move here, we can potentially save 1 op
                extraOp = -1; // 0
                break;
            }
        }
        let doMove = doDelete + extraOp;

        // console.log('del', doDelete, 'add', doAdd, 'move', doMove)
        return Math.min(doDelete, doAdd, doMove) + 1;
    }
}

function testChangeAtoBDP(A, B) {
  if (!A || !B) {
    console.assert(changeAtoBDP([1, 2, 3], [2, 3]) === 1);
    console.assert(changeAtoBDP([1, 2, 3], [3, 2]) === 2);
    console.assert(changeAtoBDP([2, 3, 1], [3, 2]) === 2);
    console.assert(changeAtoBDP([4, 2, 1, 3], [2,3,1,4]) === 2);
  } else {
    console.log(changeAtoBDP(A, B));
  }
}
