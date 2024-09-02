const game = document.querySelector("#game");
const infos = document.querySelector("#infos");
const winPopup = document.getElementById("winPopup");
const winMessage = document.getElementById("winMessage");
const resetBtn = document.getElementById("resetBtn");

const cells = Array(400).fill("");
const size = Math.sqrt(400);
const toWin = 5;

let play = "cross";
let players = [];

function loadPlayers() {
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) {
    players = JSON.parse(storedPlayers);
  }
}

function addPlayer(name) {
  const existingPlayer = players.find((player) => player.name === name);
  if (existingPlayer) {
    return existingPlayer;
  } else {
    const newPlayer = {
      name: name,
      score: 0,
    };
    players.push(newPlayer);
    return newPlayer;
  }
}

function updateScore(playerName) {
  const player = players.find((p) => p.name === playerName);
  if (player) {
    player.score++;
    saveGameHistory();
    displayPlayerInfo();
  }
}

function saveGameHistory() {
  localStorage.setItem("players", JSON.stringify(players));
}

function createGrid() {
  cells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    game.appendChild(cellElement);
  });
}

function addGo(e) {
  const start = document.createElement("div");
  start.classList.add(play);

  e.target.append(start);

  const currentPlayer1 = localStorage.getItem("currentPlayer1");
  const currentPlayer2 = localStorage.getItem("currentPlayer2");
  const playerName = play === "cross" ? currentPlayer1 : currentPlayer2;

  play = play === "cross" ? "circle" : "cross";
  infos.textContent = `${
    play === "cross" ? currentPlayer1 : currentPlayer2
  } (${play})'s turn`;
  e.target.removeEventListener("click", addGo);

  win();
}

function win() {
  const allSquares = document.querySelectorAll(".square");
  const winnerName =
    play === "cross"
      ? localStorage.getItem("currentPlayer1")
      : localStorage.getItem("currentPlayer2");
  const winner = players.find((player) => player.name === winnerName);

  function removeListeners() {
    allSquares.forEach((square) => {
      square.removeEventListener("click", addGo);
    });
  }

  for (let i = 0; i < allSquares.length; i += size) {
    for (let j = 0; j <= size - toWin; j++) {
      const slice = Array.from(allSquares).slice(i + j, i + j + toWin);
      if (
        slice.every((square) =>
          square.firstChild?.classList.contains("cross")
        ) ||
        slice.every((square) => square.firstChild?.classList.contains("circle"))
      ) {
        winMessage.textContent = `${winner.name} wins!`;
        winPopup.classList.remove("hidden");
        removeListeners();
        resetBtn.addEventListener("click", resetGame);
        updateScore(winner.name);
        return;
      }
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - toWin; j++) {
      let slice = [];
      for (let k = 0; k < toWin; k++) {
        slice.push(allSquares[i + k * size + j * size]);
      }
      if (
        slice.every((square) =>
          square.firstChild?.classList.contains("cross")
        ) ||
        slice.every((square) => square.firstChild?.classList.contains("circle"))
      ) {
        winMessage.textContent = `${winner.name} wins!`;
        winPopup.classList.remove("hidden");
        removeListeners();
        resetBtn.addEventListener("click", resetGame);
        updateScore(winner.name);
        return;
      }
    }
  }

  for (let i = 0; i <= allSquares.length - toWin * (size + 1); i++) {
    let leftToRight = [];
    for (let j = 0; j < toWin; j++) {
      leftToRight.push(allSquares[i + j * (size + 1)]);
    }

    if (
      leftToRight.every((square) =>
        square.firstChild?.classList.contains("cross")
      ) ||
      leftToRight.every((square) =>
        square.firstChild?.classList.contains("circle")
      )
    ) {
      winMessage.textContent = `${winner.name} wins!`;
      winPopup.classList.remove("hidden");
      removeListeners();
      resetBtn.addEventListener("click", resetGame);
      updateScore(winner.name);
      return;
    }
  }

  for (let i = toWin - 1; i <= allSquares.length - toWin * size; i++) {
    let rightToLeft = [];
    for (let j = 0; j < toWin; j++) {
      rightToLeft.push(allSquares[i + j * (size - 1)]);
    }

    if (
      rightToLeft.every((square) =>
        square.firstChild?.classList.contains("cross")
      ) ||
      rightToLeft.every((square) =>
        square.firstChild?.classList.contains("circle")
      )
    ) {
      winMessage.textContent = `${winner.name} wins!`;
      winPopup.classList.remove("hidden");
      removeListeners();
      resetBtn.addEventListener("click", resetGame);
      updateScore(winner.name);
      return;
    }
  }
}

function resetGame() {
  const allSquares = document.querySelectorAll(".square");

  allSquares.forEach((square) => {
    while (square.firstChild) {
      square.removeChild(square.firstChild);
    }
  });

  play = "cross";
  const currentPlayer1 = localStorage.getItem("currentPlayer1");
  infos.textContent = `${currentPlayer1} (Cross) goes first`;
  cells.fill("");
  winPopup.classList.add("hidden");
  game.innerHTML = "";
  createGrid();
  displayPlayerInfo();
}

const startButton = document.querySelector("#startGame");

startButton.addEventListener("click", () => {
  const player1Name =
    document.querySelector("#player1").value.trim() || "Player 1";
  const player2Name =
    document.querySelector("#player2").value.trim() || "Player 2";

  loadPlayers();
  const player1 = addPlayer(player1Name);
  const player2 = addPlayer(player2Name);

  localStorage.setItem("currentPlayer1", player1.name);
  localStorage.setItem("currentPlayer2", player2.name);

  saveGameHistory();
  displayPlayerInfo();
  window.location.href = "game.html";
});

function displayPlayerInfo() {
  loadPlayers();
  const currentPlayer1 = localStorage.getItem("currentPlayer1");
  const currentPlayer2 = localStorage.getItem("currentPlayer2");

  const player1 = players.find((player) => player.name === currentPlayer1) || {
    name: "Player 1",
    score: 0,
  };
  const player2 = players.find((player) => player.name === currentPlayer2) || {
    name: "Player 2",
    score: 0,
  };

  const infoContainer = document.querySelector("#playerInfo");
  if (infoContainer) {
    infoContainer.innerHTML = `
      <div>${player1.name}: ${player1.score}</div>
      <div>${player2.name}: ${player2.score}</div>
    `;
  }

  infos.textContent = `${player1.name} (Cross) goes first`;
}

function showGameHistory() {
  loadPlayers();
  const historyContainer = document.querySelector("#history");
  historyContainer.innerHTML = "";

  players.forEach((player) => {
    const historyItem = document.createElement("div");
    historyItem.textContent = `${player.name}  Score : ${player.score}`;
    historyContainer.appendChild(historyItem);
  });
}

function clearGameHistory() {
  localStorage.removeItem("players");
  players = [];
  document.querySelector("#history").innerHTML = "";
  displayPlayerInfo();
}

document
  .querySelector("#showHistory")
  .addEventListener("click", showGameHistory);

const clearHistoryButton = document.querySelector("#clearHistory");
if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", clearGameHistory);
}

loadPlayers();
createGrid();
displayPlayerInfo();

const popup = document.getElementById("scorePopup");

const showScoresBtn = document.getElementById("showScores");
const closeBtn = document.getElementsByClassName("close")[0];
const scoresList = document.getElementById("scoresList");

function populateScores() {
  const players = JSON.parse(localStorage.getItem("players")) || [];
  scoresList.innerHTML = "";

  players.forEach((player) => {
    const scoreItem = document.createElement("div");
    scoreItem.className = "score-item";
    scoreItem.innerHTML = `
          <span class="username">${player.name}</span>
          <span class="score">${player.score} pts</span>
      `;
    scoresList.appendChild(scoreItem);
  });
}

showScoresBtn.onclick = function () {
  populateScores();
  popup.style.display = "block";
};

closeBtn.onclick = function () {
  popup.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

showScoresBtn.onclick = function () {
  populateScores();
  popup.style.display = "block";
};

closeBtn.onclick = function () {
  popup.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};
