/**
 * This algorithm has the following complexity:
 * time: O(n + m) where n is size of A, and m is size of D
 *       but since we only care about the case where D's elements
 *       can all be found in A, resulting n > m, thus the time
 *       is essentially O(n)
 * space: O(m) where m is the size of D
 */
function minimumCoveringSubarray(A, D) {
  let dSet = new Set(D);
  let lookup = {};
  for (let w of A) {
    if (dSet.has(w)) {
      lookup[w] = w in lookup ? lookup[w] + 1 : 1;
    }
  }

  let s = 0, e = A.length - 1;

  // Narrow down the "start" position
  for (let i = 0; i < A.length; ++i) {
    if (A[i] in lookup && lookup[A[i]] === 1) {
      s = i; // this must be start index
      break;
    } else if (A[i] in lookup && lookup[A[i]] > 1) {
      ++s; // increment starting pos because even if we skip
           // this word, it will re-appear at a later time
      --lookup[A[i]];
    } else { // if A[i] not in lookup
      ++s;
    }
  }

  // Narrow down the "end" position
  for (let i = e; i >= s; --i) {
    if (A[i] in lookup && lookup[A[i]] === 1) {
      // this must be the last index
      e = i;
      break;
    } else if (A[i] in lookup && lookup[A[i]] > 1) {
      --e;
      --lookup[A[i]];
    } else {
      // As lookup[A[i]] should always be >= 1 at this point
      // this is the case where A[i] is not in lookup which
      // we can safely ignore and narrow "end" pointer
      --e;
    }
  }

  return A.slice(s, e + 1); // ? subarray between s and e, may need +1 because it's inclusive
}

console.log('Run: testMinimumCoveringSubarray()');

function testMinimumCoveringSubarray() {
  let case1 = [1, 2, 4, 2, 3, 2, 1, 4];
  let dict1 = [1, 2, 3];
  console.log(minimumCoveringSubarray(case1, dict1), [3, 2, 1]);
  let dict2 = [1, 2, 3, 4];
  console.log(minimumCoveringSubarray(case1, dict2), [3, 2, 1, 4]);
  let dict3 = [1, 2];
  console.log(minimumCoveringSubarray(case1, dict3), [2, 1]);
  let dict4 = [3, 2];
  console.log(minimumCoveringSubarray(case1, dict4), [3, 2]);
  let dict5 = [1, 3];
  console.log(minimumCoveringSubarray(case1, dict5), [3, 2, 1]);
  let dict6_x = [1, 7];
  // NOTE:
  // this returns [1] when expected is [], or maybe we should
  // just throw error in this case, basically we need to make
  // sure all dict words can be found, otherwise need to discuss
  // how to handle the edge case
  console.log(minimumCoveringSubarray(case1, dict6_x), []);
}

/**
 * A revised implementation aiming to reduce time complexity
 * theoretically we can use time O(k) where k is the end index
 * of the minimum subarray
 *
 * UPDATE:
 *  - This turns out to be not possible, we always need to
 *    figure out how many more elements left in case a better
 *    solution is yet to be discovered
 */
function minCoveringSubArray(A, D) {

}
