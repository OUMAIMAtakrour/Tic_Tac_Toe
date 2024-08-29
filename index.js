const game = document.querySelector("#game");
const infos = document.querySelector("#infos");
console.log(game);
let play = "circle";
const cells = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  //   37
];

infos.textContent = "cross goes first";
function createGrid() {
  cells.forEach((cell, index) => {
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
function addGo() {
  console.log("clicked", e.target);
  const start = document.createElement("div");
  start.classList.add(play);
  e.target.append(start)
}
