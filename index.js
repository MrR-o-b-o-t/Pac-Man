const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let currentScore = 0;
let direction = null;
let squares = []

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);

    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
  }   else if (layout[i] === 3) {
      squares[i].classList.add("power-pellet");
    }
  }
}

createBoard();
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pacman");

function pacmanMotion() {
  squares[pacmanCurrentIndex].classList.remove("pacman");
  switch (direction) {
    case "w":
      if (
        !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        pacmanCurrentIndex - width >= 0
      )
        pacmanCurrentIndex -= width;
        console.log(pacmanCurrentIndex)
      break;
    case "s":
      if (
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width * width
      )
        pacmanCurrentIndex += width;
        console.log(pacmanCurrentIndex)
      break;
    case "d":
      if (
        !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width < width - 1
      )
        pacmanCurrentIndex += 1;
        if(pacmanCurrentIndex === 391){
          pacmanCurrentIndex = 364;
        }
        console.log(pacmanCurrentIndex)
      break;
    case "a":
      if (
        !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex -= 1;
        if(pacmanCurrentIndex === 364) {
          pacmanCurrentIndex = 391;
        }
        console.log(pacmanCurrentIndex)
      break;
  }
  squares[pacmanCurrentIndex].classList.add("pacman");
}

function movePacman(e) {
  if (e.key === "w") {
    direction = "w";
  } else if (e.key === "s") {
    direction = "s";
  } else if (e.key === "d") {
    direction = "d";
  } else if (e.key === "a") {
    direction = "a";
  }
}

function keepScore() {
  let currentClassList = squares[pacmanCurrentIndex].classList;
  if (currentClassList.contains("pac-dot")) {
    currentScore = currentScore + 10;
    scoreDisplay.innerText = currentScore;
    currentClassList.remove("pac-dot");
  } else if (currentClassList.contains("power-pellet")) {
    currentScore = currentScore + 50;
    currentClassList.remove("power-pellet");
    scoreDisplay.innerText = currentScore;
  }
}

document.addEventListener("keypress", movePacman);
let movement = setInterval(pacmanMotion, 300);
let scoreTracker = setInterval(keepScore, 300);

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
  }
}

ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
]
