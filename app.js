// Initial Board State
let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
let gameFinished = false;
let currentPlayer = 1;
let boardIndex = 0;

const player1_moves = new Set(["pit1", "pit2", "pit3", "pit4", "pit5", "pit6"]);

const player2_moves = new Set([
  "pit7",
  "pit8",
  "pit9",
  "pit10",
  "pit11",
  "pit12",
]);

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("current-player").innerText = currentPlayer;
}
function isValidMove(pit) {
  // Logic to check if valid move
  if (board[boardIndex] < 1) {
    return false;
  }
  if (currentPlayer == 1 && player1_moves.has(pit)) {
    return true;
  }
  if (currentPlayer == 2 && player2_moves.has(pit)) {
    return true;
  }
  return false;
}

function setIndex(pit) {
  pit = parseInt(pit.replace("pit", ""));
  console.log(pit);
  if (pit <= 6) {
    boardIndex = pit - 1;
  } else {
    boardIndex = pit;
  }
  console.log(`Board Index: ${boardIndex}`);
}

function makeMove() {
  let skipIndex = 13;
  if (currentPlayer == 2) {
    skipIndex = 6;
  }
  numPebbles = board[boardIndex];
  board[boardIndex] = 0;

  while (numPebbles > 0) {
    numPebbles -= 1;
    boardIndex += 1;
    if (boardIndex != skipIndex) {
      board[boardIndex] += 1;
    }
    if (boardIndex > 12) {
      boardIndex = -1;
    }
    updateBoard();
  }
  console.log(board);
}

function updateBoard() {
  // Player 1 Pits
  for (let i = 0; i <= 5; i++) {
    document.getElementById(`pit${i + 1}`).innerText = board[i];
  }
  // Player 2 Pits
  for (let i = 7; i <= 12; i++) {
    document.getElementById(`pit${i}`).innerText = board[i];
  }
  // Player Stores
  document.getElementById("store-player1").innerText = board[6];
  document.getElementById("store-player2").innerText = board[13];
}

updateBoard();

document.querySelectorAll(".pit").forEach((pit) => {
  pit.addEventListener("click", function () {
    // Execute move
    // Figure out if turn switches or bonus turn granted
    // Update board and UI
    console.log(pit.id);
    setIndex(pit.id);
    if (isValidMove(pit.id)) {
      console.log("valid move!");
      makeMove();
      switchTurn();
    } else {
      console.log("invalid move");
    }
  });
});
