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
    if (next_x <= xMax &&
      next_x >= xMin &&
      next_y <= yMax &&
      next_y >= yMin) {
        x = next_x; y = next_y;
    } else {
      // change bounds
      switch (curDir) {
        case 0:
          ++xMin;
          break;
        case 1:
          --yMax;
          break;
        case 2:
          --xMax;
          break;
        case 3:
          ++yMin;
          break;
      }
      // next move is invalid, we need to change direction!!
      curDir = (curDir + 1) % 4;

      x += dirs[curDir][0];
      y += dirs[curDir][1];
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