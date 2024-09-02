const game = document.querySelector("#game");
const infos = document.querySelector("#infos");
console.log(game);
// const cells = [];
// for(let i;i<400;i++){
//     cells.push("");
// }

const cells = Array(400).fill("");
const size = Math.sqrt(400);
const toWin = 5;
// const row = cells.length;
// console.log(row);

let count = 0;
let play = "cross";
infos.textContent = "cross goes first";
function createGrid() {
  cells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    // const circleElement = document.createElement("div");
    // circleElement.classList.add("cross");
    // cellElement.appendChild(circleElement);
    game.appendChild(cellElement);
  });
}
createGrid();
function addGo(e) {
  console.log("clicked", e.target);
  const start = document.createElement("div");
  start.classList.add(play);
  e.target.append(start);
  play = play === "cross" ? "circle" : "cross";
  console.log(play);
  infos.textContent = play + "'s turn";
  e.target.removeEventListener("click", addGo);
  win();
}


winningCombinations = [];

function win(e) {
  const allSquares = document.querySelectorAll(".square");
  function removeListeners() {
    allSquares.forEach((square) => {
      square.removeEventListener("click", addGo);
    });
  }
  for (let i = 0; i < allSquares.length; i += size) {
    for (let j = 0; j < 16; j++) {
      const slice = Array.from(allSquares).slice(i + j, i + j + 5);
      if (
        (slice.length === 5 &&
          slice.every((square) =>
            square.firstChild?.classList.contains("cross")
          )) ||
        (slice.length === 5 &&
          slice.every((square) =>
            square.firstChild?.classList.contains("circle")
          ))
      ) {
        infos.textContent = "win";
        removeListeners();
        return;
      }
    }

    for (let i = 0; i <= allSquares.length - toWin * (size + 1); i++) {
      let leftToRight = [];
      for (let j = 0; j < toWin; j++) {
        leftToRight.push(allSquares[i + j * (size + 1)]);
      }

      if (
        leftToRight.length === toWin &&
        leftToRight.every((square) =>
          square.firstChild?.classList.contains("cross")
        )
      ) {
        infos.textContent = "Cross wins!";
        removeListeners();
        return;
      }

      if (
        leftToRight.length === toWin &&
        leftToRight.every((square) =>
          square.firstChild?.classList.contains("circle")
        )
      ) {
        infos.textContent = "Circle wins!";
        removeListeners();
        return;
      }
    }

    for (let i = toWin - 1; i <= allSquares.length - toWin * size; i++) {
      let rightToLeft = [];
      for (let j = 0; j < toWin; j++) {
        rightToLeft.push(allSquares[i + j * (size - 1)]);
      }

      if (
        rightToLeft.length === toWin &&
        rightToLeft.every((square) =>
          square.firstChild?.classList.contains("cross")
        )
      ) {
        infos.textContent = "Cross wins!";
        removeListeners();
        return;
      }

      if (
        rightToLeft.length === toWin &&
        rightToLeft.every((square) =>
          square.firstChild?.classList.contains("circle")
        )
      ) {
        infos.textContent = "Circle wins!";
        removeListeners();
        return;
      }
    }
  }
}
