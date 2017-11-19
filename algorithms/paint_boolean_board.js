function paintBooleanBoard(board, entry) {
  // entry: [i, j]
  let point = {
    i: entry[0],
    j: entry[1]
  };
  let q = [point];
  let color = board[point.i][point.j];

  while (q.length) {
    let pt = q.shift();

    board[pt.i][pt.j] = !color;
    if (pt.i !== 0 && board[pt.i - 1][pt.j] === color) {
      q.push({i: pt.i - 1, j: pt.j});
    }
    if (pt.i !== board.length - 1 &&  board[pt.i + 1][pt.j] === color) {
      q.push({i: pt.i + 1, j: pt.j});
    }
    if (pt.j !== 0 && board[pt.i][pt.j - 1] === color) {
      q.push({i: pt.i, j: pt.j - 1});
    }
    if (pt.j !== board[0].length - 1 && board[pt.i][pt.j + 1] === color) {
      q.push({i: pt.i, j: pt.j + 1});
    }
  }
  return board;
}

console.log('Run: testPaintBooleanBoard(board, entry) to test')
function testPaintBooleanBoard(board, entry) {
  board = board || [
    [false, true, true, false],
    [false, false, true, true],
    [true, false, true, false],
    [true, false, true, false]
  ];
  entry = entry || [0, 0];
  console.log(paintBooleanBoard(board, entry));
}