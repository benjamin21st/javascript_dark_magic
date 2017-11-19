function spiral2DArray (grid) {
  if (!grid || !grid.length) return;
  // right, down, left, up
  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  // what we use for bounds checking
  let xMax = grid.length - 1, xMin = 0, yMax = grid[0].length - 1, yMin = 0;

  let curDir = 0; // initialize to start moving right
  let res = [];
  // totally we need to move m * n rounds
  /**
   * [[1, 2, 3],
   *  [4, 5, 6],
   *  [7, 8, 9]]
   */
  let x = 0, y = 0;
  for (let i = 0; i < grid.length * grid[0].length; ++i) {
    res.push(grid[x][y]);
    let next_x = x + dirs[curDir][0], next_y = y + dirs[curDir][1];
    if (next_x <= xMax && next_x >= xMin && next_y <= yMax && next_y >= yMin) {
      x = next_x; y = next_y;
    } else {
      // change bounds
      switch (curDir) {
        case 0: ++xMin; break;
        case 1: --yMax; break;
        case 2: --xMax; break;
        case 3: ++yMin; break;
      }
      // next move is invalid, we need to change direction!!
      curDir = (curDir + 1) % 4;

      x += dirs[curDir][0];
      y += dirs[curDir][1];
    }
  }
  return res;
}

function reverseSpiral (A) {
  let n = Math.sqrt(A.length);
  // create 2D matrix
  let res = new Array(n);
  for (let i = 0; i < n; ++i) {
    res[i] = new Array(n);
  }
  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let curDir = 0;
  let x = 0, y = 0;
  let top = 0, bottom = n - 1, left = 0, right = n - 1;

  for (let i = 0; i < A.length; ++i) {
    res[x][y] = A[i];
    let nex = x + dirs[curDir][0], ney = y + dirs[curDir][1];
    if (nex >= top && nex <= bottom && ney >= left && ney <= right) {
      x = nex, y = ney;
    } else {
      switch (curDir) {
        case 0: ++top; break;
        case 1: --right; break;
        case 2: --bottom; break;
        case 3: ++left; break;
      }
      curDir = (curDir + 1) % 4;
      x += dirs[curDir][0], y += dirs[curDir][1];
    }
  }
  return res;
}

/**
 *
 * @param {number, number} start
 * @param {number} n
 */
function firstNPairSpiral (start, n) {
  let res = [];
  let xMax = 1,  xMin = -1, yMax = 1, yMin =  -1;
  //           right    down    left     up
  let dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
  let curDir = 0;
  // whenever we make a round trip back to dirs[0], we expand bounds by 1
  for (let i = 0; i < n; ++i) {
    res.push([...start]);
    let nextX = start[0] + dirs[curDir][0], nextY = start[1] + dirs[curDir][1];
    if (nextX <= xMax && nextX >= xMin && nextY <= yMax && nextY >= yMin) {
      start[0] = nextX; start[1] = nextY;
    } else {
      let prevDir = curDir;
      curDir = (curDir + 1) % 4;
      // check if we made a round trip
      if (prevDir === 3) {
        // expand boundaries
        ++xMax; ++yMax; --xMin; --yMin;
      }
      start[0] += dirs[curDir][0];
      start[1] += dirs[curDir][1];
    }
  }
  return res;
}

function testSpiral2DArray () {
  let grid =
  [[1, 2, 3],
   [4, 5, 6],
   [7, 8, 9]];
  console.log(spiral2DArray(grid));
  let evenGrid =
  [[1, 2,],
  [4, 5],];
  console.log(spiral2DArray(evenGrid));
}

function testReverseSpiral () {
  let A = [1, 2, 3, 6, 9, 8, 7, 4, 5];
  let B = [1, 2, 4, 3]
  console.log(reverseSpiral(A))
  console.log(reverseSpiral(B))
}

function testFirstNPairSpiral () {
  let start = [0, 0];
  console.log(firstNPairSpiral([...start], 5))
  console.log(firstNPairSpiral([...start], 10));
  console.log(firstNPairSpiral([...start], 20));
}