// Initialize the game board
let boardArray = ['', '', '', '', '', '', '', '', '']; // Represents the state of the game board
let currentPlayer = 'X'; // Tracks the current player (X or O)
let emptyBoxes = 9; // Counts the remaining empty cells
let cellEnabled = true; // Controls whether cells can be clicked

// Select HTML elements
const boardElements = document.getElementsByClassName('cell'); // Select all cell elements
const para = document.getElementById('result'); // Select the result paragraph
const board = document.querySelector('.board'); // Select the game board
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle a player's move
function move(clickedBox, i) {
  if (boardArray[i] === '' && cellEnabled) {
    clickedBox.innerHTML = currentPlayer;
    boardArray[i] = currentPlayer;
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Switch player
    emptyBoxes--;
    checkWin();
  }
}

// Function to check for a win or draw
function checkWin() {
  let foundWinner = false;
  for (let i = 0; i < 8; i++) {
    if (boardArray[winningCombinations[i][0]] !== '') {
      if (boardArray[winningCombinations[i][0]] === boardArray[winningCombinations[i][1]] &&
        boardArray[winningCombinations[i][0]] === boardArray[winningCombinations[i][2]]) {
        cellEnabled = false;
        para.innerHTML = boardArray[winningCombinations[i][0]] + " WON!";
        foundWinner = true;
        transitionOut(winningCombinations[i][0], winningCombinations[i][1], winningCombinations[i][2]);
      }
    }
  }
  if (emptyBoxes === 0 && !foundWinner) {
    para.innerHTML = "It's a DRAW!";
    cellEnabled = false;
    transitionOut(-1);
  }
}

// Function to handle the transition when the game ends
function transitionOut(a, b, c) {
  if (a !== -1) {
    boardElements[a].style.color = 'tomato'; // Highlight the winning cells
    boardElements[b].style.color = 'tomato';
    boardElements[c].style.color = 'tomato';
  }
  board.style.opacity = 0; // Fade out the game board
  result.style.opacity = 0; // Fade out the result message
  setTimeout(reset, 1000); // After a delay, reset the game
}

// Function to reset the game board
function reset() {
  board.style.opacity = 1; // Restore the game board's opacity
  for (let i = 0; i < 9; i++) {
    boardElements[i].innerHTML = ''; // Clear cell contents
    boardElements[i].style.color = 'rgb(66, 66, 66)'; // Restore cell colors
    boardArray[i] = ''; // Reset the game board state
  }
  result.style.opacity = 1; // Restore the result message's opacity
  currentPlayer = 'X'; // Set the starting player
  emptyBoxes = 9; // Reset the empty cell count
  cellEnabled = true; // Enable cell interactions
  para.innerHTML = ''; // Clear the result message
}
