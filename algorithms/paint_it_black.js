function paintItBlack(B) {
  if (!B || !B.length || !B[0].length) return;
  let m = B.length, n = B[0].length;
  for (let i = 0; i < m; ++i) {
    // check the two vertical borders
    if (B[i][0] === 'W') { DFS(B, i, 0); }
    if (B[i][n - 1] === 'W') { DFS(B, i, n - 1); }
  }

  for (let i = 0; i < n; ++i) {
    // check the two horizontal borders
    if (B[0][i] === 'W') { DFS(B, 0, i); }
    if (B[m - 1][i] === 'W') { DFS(B, m - 1, i); }
  }

  // toggle states
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      B[i][j] = B[i][j] === 'T' ? 'W' : 'B';
    }
  }
}

function DFS(A, i, j) {
  let m = A.length, n = A[0].length;

  A[i][j] = 'T';

  if (i > 0 && A[i - 1][j] === 'W') { DFS(A, i - 1, j); }
  if (i < m - 1 && A[i + 1][j] === 'W') { DFS(A, i + 1, j); }
  if (j > 0 && A[i][j - 1] === 'W') { DFS(A, i, j - 1); }
  if (j < n - 1 && A[i][j + 1] === 'W') { DFS(A, i, j + 1); }
}

console.log('Run: testPaintItBlack()');

function testPaintItBlack() {
  let input = [
    ['B', 'B', 'B', 'B'],
    ['W', 'B', 'W', 'B'],
    ['B', 'W', 'W', 'B'],
    ['B', 'B', 'B', 'B']
  ];
  paintItBlack(input);
  console.log(input);

  let input2 = [
    ['B', 'W', 'B', 'B'],
    ['W', 'B', 'W', 'B'],
    ['B', 'W', 'W', 'B'],
    ['B', 'B', 'B', 'B']
  ];
  paintItBlack(input2);
  console.log(input2);

  let input3 = [
    ['W', 'W', 'B', 'B'],
    ['W', 'B', 'W', 'B'],
    ['W', 'W', 'W', 'B'],
    ['B', 'B', 'B', 'B']
  ];
  paintItBlack(input3);
  console.log(input3);
}
