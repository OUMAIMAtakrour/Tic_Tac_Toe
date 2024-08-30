const game = document.querySelector("#game");
const infos = document.querySelector("#infos");
console.log(game);
// const cells = [];
// for(let i;i<400;i++){
//     cells.push("");
// }
const cells = Array(400).fill("");

const row = cells.length;
console.log(row);

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
  checkScore();
}
winningCombinations = [];

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
}
