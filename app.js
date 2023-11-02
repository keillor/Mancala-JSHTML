let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
let gameFinished = false;

let currentPlayer = 1;

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("current-player").innerText = currentPlayer;
}

document.querySelectorAll(".pit").forEach((pit) => {
  pit.addEventListener("click", function () {
    if (isValidMove(pit)) {
      // Execute move
      // Figure out if turn switches or bonus turn granted
      // Update board and UI
      console.log("pit clicked!");
      console.log(pit.value);
      switchTurn();
    }
    console.log(pit);
    console.log("pit clicked!");
    console.log(pit.value);
    switchTurn();
  });
});

function isValidMove(pit) {
  // Logic to check if valid move
  if (currentPlayer == 1) {
  } else return true;
}
