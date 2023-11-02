// Initial Board State
let board = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0];
let gameFinished = false;
let currentPlayer = 1;
let p1MinPit = 1;
let p2MinPit = 7;
let p1MaxPit = 6;
let p2MaxPit = 12;
let p1Store = board[0];
let p2Store = board[13];


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

function keepTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 0;
  document.getElementById("current-player").innerText = currentPlayer;
}


function isValidMove(pit) {
  // Logic to check if valid move
  if (currentPlayer == 1 && player1_moves.has(pit)) {
    return true;
  }
  if (currentPlayer == 2 && player2_moves.has(pit)) {
    return true;
  }
  return false;
}

function updateBoard() {
  // Player 1 Pits
  for (let i = p1MinPit; i <= p2MaxPit; i++) {
    document.getElementById(`pit${i}`).innerText = board[i];
  }
  // Player Stores
  document.getElementById("store-player1").innerText = p1Store;
  document.getElementById("store-player2").innerText = p2Store;
}

function addToPits(startingPit, currentPlayer) {
  
  let pit = parseInt(startingPit.replace('pit', ''));
  let totalGems = board[pit];
  let nextPit = pit + 1;
  let pitSide = currentPlayer;
  let lastGem = totalGems - 1;

  board[pit] = 0;
  
  for (let i = 0; i < totalGems; i++) {
    if (pitSide == 1) {
      if (nextPit == 7 && currentPlayer == 1)  {
        if (i == lastGem) {
          keepTurn();
        }
        p1Store += 1;
        document.getElementById("store-player1").innerText = p1Store
        pitSide = 2;
      }
      else if (nextPit == 7 && currentPlayer == 2){
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit]
        nextPit++;
        pitSide == 2;
      }
      else {
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit]
        nextPit++;
      }
    }
    else {
      if (nextPit == 13 && currentPlayer == 2) {
        if (i == lastGem) {
          keepTurn();
        }
        p2Store += 1;
        document.getElementById("store-player2").innerText = p2Store
        nextPit = 1;
        pitSide = 1;
      }
      else if (nextPit == 13 && currentPlayer == 1){
        nextPit = 1;
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit]
        nextPit++;
        pitSide = 1;
      }
      else {
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit]
        nextPit++;
      }
    }
  }
  document.getElementById(`pit${pit}`).innerText = board[pit];
}


updateBoard();

document.querySelectorAll(".pit").forEach((pit) => {
  pit.addEventListener("click", function () {
    // Execute move
    // Figure out if turn switches or bonus turn granted
    // Update board and UI
    console.log(pit.id);
    if (isValidMove(pit.id)) {
      console.log("valid move!");
      
      addToPits(pit.id, currentPlayer)
      switchTurn();
    } else {
      console.log("invalid move");
    }
  });
});
