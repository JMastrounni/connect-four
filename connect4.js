/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let playerDisplay = document.querySelector('h2')

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // Creates top row element and adds an event listener for clicks
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // For loop loops through HEIGHT and creates a tr (table row) element for each iteration
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // For loop loops through WIDTH and creates a td (standard data cell) element for each iteration
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // Sets the id of each cell to the current position it is at, and appends each cell to the row
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //Appends each completed row to the HTML board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // Prevents the top clickable row from being selected, iterates until it reaches the bottom
  for(let y = HEIGHT - 1; y > -1; y--){
    // If there is no value in the 
    if(!board[y][x]) {
      // console.log(y);
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //creates div for each piece, adds piece class to it
  let piece = document.createElement('div');
  piece.classList.add('piece');
  //additionally checks for current player and adds class based on that
  if(currPlayer === 1) {
    piece.classList.add('player1')
  } else {
    piece.classList.add('player2')
  }
  //gets current position using function values
  const currPosition = document.getElementById(`${y}-${x}`);
  currPosition.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // console.log(`player ${currPlayer}`)
  if (currPlayer === 1) {
    playerDisplay.innerText = 'Current Player: 2'
    playerDisplay.style.color = 'blue';
  } else {
    playerDisplay.innerText = 'Current Player: 1'
    playerDisplay.style.color = 'red';
  }

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    setTimeout(function() {
      return endGame(`Player ${currPlayer} wins!`)
    }, 10)
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(cell => cell.every(row => row))){
    return endGame('The game ends in a tie!');
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // if (currPlayer === 1) {
  //   currPlayer = 2;
  // } else {
  //   currPlayer = 1;
  // }
  //ternary operator for player swapping
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
