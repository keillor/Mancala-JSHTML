// Initial Board State
let board = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0];
// let board = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
let gameFinished = false;
let currentPlayer = 1;
let p1MinPit = 1;
let p2MinPit = 7;
let p1MaxPit = 6;
let p2MaxPit = 12;
let p1Store = board[0];
let p2Store = board[13];
let allZero = false;

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
    const pitElement = document.getElementById(`pit${i}`);
    pitElement.innerHTML = getMarblesHtml(board[i]);
  }
  // Player Stores
  document.getElementById("store-player1").innerHTML = getMarblesHtml(p1Store);
  document.getElementById("store-player2").innerHTML = getMarblesHtml(p2Store);
}

function getMarblesHtml(count) {
  let marblesHtml = "";
  for (let i = 0; i < count; i++) {
    if (i > 0 && i % 4 === 0) {
      marblesHtml += "<br>";
    }
    marblesHtml += "🔵";
  }
  return marblesHtml;
}

function findOppositePit(pit) {
  let oppositePit = 100;
  if (12 == pit + 11) oppositePit = 12;
  else if (11 == pit + 9) oppositePit = 11;
  else if (10 == pit + 7) oppositePit = 10;
  else if (9 == pit + 5) oppositePit = 9;
  else if (8 == pit + 3) oppositePit = 8;
  else if (7 == pit + 1) oppositePit = 7;
  else if (1 == pit - 11) oppositePit = 1;
  else if (2 == pit - 9) oppositePit = 2;
  else if (3 == pit - 7) oppositePit = 3;
  else if (4 == pit - 5) oppositePit = 4;
  else if (5 == pit - 3) oppositePit = 5;
  else if (6 == pit - 1) oppositePit = 6;

  return oppositePit;
}

function checkEnd(currentPlayer) {
  if (currentPlayer == 1) {
    for (let i = p1MinPit; i <= p1MaxPit; i++) {
      if (board[i] != 0) {
        allZero = false;
        break;
      } else {
        allZero = true;
      }
    }
  }

  if (currentPlayer == 2) {
    for (let i = p2MinPit; i <= p2MaxPit; i++) {
      if (board[i] != 0) {
        allZero = false;
        break;
      } else {
        allZero = true;
      }
    }
  }

  return allZero;
}

function gameEnd() {
  for (let i = p1MinPit; i <= p1MaxPit; i++) {
    p1Store += board[i];
    board[i] = 0;
    document.getElementById("store-player1").innerText = p1Store;
    document.getElementById(`pit${i}`).innerText = board[i];
  }
  for (let i = p2MinPit; i <= p2MaxPit; i++) {
    p2Store += board[i];
    board[i] = 0;
    document.getElementById("store-player2").innerText = p2Store;
    document.getElementById(`pit${i}`).innerText = board[i];
  }

  if (p1Store > p2Store) {
    console.log("p1 wins!");
    alert("Player 1 wins!");
  } else if (p2Store > p1Store) {
    console.log("p2 wins!");
    alert("Player 2 wins!");
  }
  if (p1Store == p2Store) {
    console.log("Tie!");
    alert("Tie Game");
  }
}

function addToPits(startingPit, currentPlayer) {
  let pit = parseInt(startingPit.replace("pit", ""));
  let totalGems = board[pit];
  let nextPit = pit + 1;
  let pitSide = currentPlayer;
  let lastGem = totalGems - 1;

  board[pit] = 0;

  for (let i = 0; i < totalGems; i++) {
    if (pitSide == 1) {
      if (nextPit == 7 && currentPlayer == 1) {
        if (i == lastGem) {
          p1Store += 1;
          document.getElementById("store-player1").innerText = p1Store;
          switchTurn();
          break;
        } else if (i != lastGem) {
          p1Store += 1;
          document.getElementById("store-player1").innerText = p1Store;
          pitSide = 2;
        }
      } else if (
        board[nextPit] == 0 &&
        i == lastGem &&
        currentPlayer == 1 &&
        nextPit != 13 &&
        nextPit != 7
      ) {
        oppositePit = findOppositePit(nextPit);
        p1Store += board[oppositePit] + 1;
        board[oppositePit] = 0;
        board[nextPit] = 0;
        document.getElementById("store-player1").innerText = p1Store;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit];
        document.getElementById(`pit${oppositePit}`).innerText =
          board[oppositePit];
      } else if (nextPit == 7 && currentPlayer == 2) {
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit];
        nextPit++;
        pitSide = 2;
      } else {
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit];
        nextPit++;
      }
    } else if (pitSide == 2) {
      if (nextPit == 13 && currentPlayer == 2) {
        if (i == lastGem) {
          switchTurn();
          p2Store += 1;
          document.getElementById("store-player2").innerText = p2Store;
          break;
        } else if (i != lastGem) {
          p2Store += 1;
          document.getElementById("store-player2").innerText = p2Store;
          nextPit = 1;
          pitSide = 1;
        }
      } else if (
        board[nextPit] == 0 &&
        i == lastGem &&
        currentPlayer == 2 &&
        nextPit != 13 &&
        nextPit != 7
      ) {
        oppositePit = findOppositePit(nextPit);
        p2Store += board[oppositePit] + 1;
        board[oppositePit] = 0;
        board[nextPit] = 0;
        document.getElementById("store-player2").innerText = p2Store;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit];
        document.getElementById(`pit${oppositePit}`).innerText =
          board[oppositePit];
      } else if (nextPit == 13 && currentPlayer == 1) {
        nextPit = 1;
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit];
        nextPit++;
        pitSide = 1;
      } else {
        board[nextPit] += 1;
        document.getElementById(`pit${nextPit}`).innerText = board[nextPit];
        nextPit++;
      }
    }
  }
  document.getElementById(`pit${pit}`).innerText = board[pit];
  checkEnd(currentPlayer);
  if (allZero == true) {
    gameEnd();
  }
}

updateBoard();

// Updates class for hover color
// Player 1 row is row 2
const row2 = document.getElementById("row2");
const row1 = document.getElementById("row1");
row2.classList.add("valid");
row1.classList.add("invalid");

function updateHoverColor() {
  if (currentPlayer == 1) {
    row2.classList.add("valid");
    row2.classList.remove("invalid");
    row1.classList.add("invalid");
    row1.classList.remove("valid");
  }
  if (currentPlayer == 2) {
    row2.classList.add("invalid");
    row2.classList.remove("valid");
    row1.classList.add("valid");
    row1.classList.remove("invalid");
  }
}

document.querySelectorAll(".pit").forEach((pit) => {
  pit.addEventListener("click", function () {
    console.log(pit.id);
    if (isValidMove(pit.id)) {
      console.log("valid move!");
      console.log(row2.classList);
      console.log(row1.classList);
      addToPits(pit.id, currentPlayer);
      updateBoard(); // Ensure the board is updated after each move
      switchTurn();
      updateHoverColor();
    } else {
      console.log("invalid move");
    }
  });
});

// Function and event listener to reset game
function resetGame() {
  board = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0];
  p1Store = board[0];
  p2Store = board[13];
  currentPlayer = 1;
  gameFinished = false;
  allZero = false;
  console.log("reset game");
  updateBoard();
  document.getElementById("current-player").innerText = currentPlayer;
}

document.getElementById("reset-button").addEventListener("click", resetGame);
