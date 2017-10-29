class NQueens {
  generate (n) {
    // step1:
    // create board, and an auxiliary array to keep track of
    // the columns been used
    // create a result array which should hold boards
    let board = this.createBoard(n);
    let arr = (new Array(n)).fill(0);
    let res = [];

    // step2:
    // traverse the board and put a Queen at a valid position, then
    // using current board state and helper array state to recursively
    // place the rest of the queens, we break out at each row if there
    // is a conflict
    this.nQueensHelper(board, arr, 0, res);

    // step3:
    // when the reach the n-th row and there is no conflict, we push the
    // resulting board into the result
    return res;
  }

  count (n) {
    let board = this.createBoard(n);
    let arr = (new Array(n)).fill(0);
    let res = this.nQueensCountHelper(board, arr, 0);
    return res;
  }

  nQueensHelper(board, arr, row, res) {
    if (row === board.length) {
      res.push(this.cloneBoard(board));
      return;
    }
    for (let j = 0; j < board[0].length; ++j) { // for each column
      // if we have a row above
      if (!this.isValidMove(board, arr, row, j)) continue;
      // we can place our queen
      arr[j] = 1; // mark this column as occupied
      board[row][j] = 1;
      // recursively place the rest of the queens assuming this placement is optimal
      this.nQueensHelper(board, arr, row + 1, res);
      // reset the board and arr value for next iteration
      arr[j] = 0;
      board[row][j] = 0;
    }
  }

  nQueensCountHelper (board, arr, row) {
    if (row === board.length) return 1;
    let countRestOfPlacements = 0;
    for (let i = 0; i < board[row].length; ++i) {
      if (!this.isValidMove(board, arr, row, i)) continue;
      arr[i] = 1;
      board[row][i] = 1;
      countRestOfPlacements += this.nQueensCountHelper(board, arr, row + 1);
      arr[i] = 0;
      board[row][i] = 0;
    }
    return countRestOfPlacements;
  }

  isValidMove(board, arr, row, col) {
    if (row !== 0) {
      if (arr[col]) return false; // if this column is already occupied
      // if there is a queen to our northwest
      if (col !== 0 && board[row - 1][col - 1]) return false;
      // if .... northeast
      if (col !== board.length - 1 && board[row - 1][col + 1]) return false;
    }
    return true;
  }

  createBoard(n) {
    let res = new Array(n);
    for (let i = 0; i < n; ++i) {
      res[i] = (new Array(n)).fill(0);
    }
    return res;
  }

  cloneBoard(board) {
    let res = new Array(board.length);
    for (let i = 0; i < board.length; ++i) {
      res[i] = board[i].slice(0);
    }
    return res;
  }
}

console.log('Run: testNQueens(n) to test')
function testNQueens (n) {
  n = n || 4;
  let n_q = new NQueens();
  console.log(n_q.generate(n));
  console.log(n_q.count(n));
}