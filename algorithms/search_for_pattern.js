/**
 * time: O(4**n * n**2)
 * Correction: we wouldn't get 4**n on this one because we are not performing
 *             a full DFS (without marking visited cells), we abort whenever
 *             a value doesn't match the pattern, so the recursive function
 *             should be less than the total number of all cells (this requires
 *             memoization of course)
 */
function searchForPatternDFS(A, P) {
  let cache = {};
  for (let i = 0; i < A.length; ++i) {
    for (let j = 0; j < A[0].length; ++j) {
      // try starting the search at each cell
      if (searchPatternDFSHelper(A, i, j, P, 0, cache)) {
        return true;
      }
    }
  }
  return false;
}

function searchPatternDFSHelper(A, i, j, P, idx, cache) {
  // make sure we have a truthy base condition
  if (idx === P.length) { return true; }
  if (A[i][j] !== P[idx]) {
    return false;
  }

  // deliver from cache if we have it, to maintain cache size we only store
  // found ones in cache because that's more costly to compute
  if (i in cache && j in cache[i] && cache[i][j][P[idx]]) {
    console.log('Cached: ', [i, j, P[idx]]);
    return true;
  }

  // recalculate if we don't have it
  cache[i] = cache[i] || {};
  cache[i][j] = cache[i][j] || {};
  // instead of caching the index, we cache the value because that's what we care
  cache[i][j][P[idx]] = true;

  let nextIdx = idx + 1;
  attempts.push([i, j, idx]);
  // search all four directions
  if (
    (i > 0 && searchPatternDFSHelper(A, i - 1, j, P, nextIdx, cache)) ||
    (i < A.length - 1 && searchPatternDFSHelper(A, i + 1, j, P, nextIdx, cache)) ||
    (j > 0 && searchPatternDFSHelper(A, i, j - 1, P, nextIdx, cache)) ||
    (j < A[0].length - 1 && searchPatternDFSHelper(A, i, j + 1, P, nextIdx, cache)))
  {
    return true;
  }

  // if i, j exceed the bounds or that none of the searches
  // were successful
  return false;
}

let attempts;
console.log('Run: testSearchPatternDFS(A, P)');

function cmpAttempts(a, b) {
  if (a[0] !== b[0]) {
    return a[0] - b[0];
  } else if (a[1] !== b[1]) {
    return a[1] - b[1];
  } else {
    return a[2] - b[2];
  }
}

function testSearchPatternDFS(A, P) {
  attempts = [];
  if (!A || !P) {
    A = [[1, 2, 3], [3, 4, 5], [5, 6, 7]];
    P = [1, 3, 4, 6];
  }
  console.log('Grid:    ', A)
  console.log('Pattern: ', P)
  console.log(searchForPatternDFS(A, P));
  console.log('Tried all attempts', attempts.sort(cmpAttempts).slice(0));

  // This example especially tests whether the caching is
  // imeplemented correctly
  A = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  P = [1, 2, 5, 8, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4];

  attempts = [];
  console.log('Grid:    ', A)
  console.log('Pattern: ', P)
  console.log(searchForPatternDFS(A, P));
  console.log('Tried all attempts', attempts.sort(cmpAttempts).slice(0));
}
