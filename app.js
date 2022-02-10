const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let score = 0;

// Board mechanics:
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
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
];

// create game board
function createBoard() {
  for (let i = 0; i < layout.length; i += 1) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square); // push squares to squares array

    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot');
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall');
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair');
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet');
    }
  }

}

createBoard();

// Pac-Man starting position
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pacman');

// Move Pac-Man
function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman');

  switch (e.key) { // 40
    case 'ArrowDown':
      if (
        pacmanCurrentIndex + width < width * width && 
        !squares[pacmanCurrentIndex + width].classList.contains('wall') && 
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
        ) {
        pacmanCurrentIndex += width;
      }
      break;
    case 'ArrowUp': // 38
      if (
        pacmanCurrentIndex - width >= 0 && 
        !squares[pacmanCurrentIndex - width].classList.contains('wall') && 
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
        ) {
        pacmanCurrentIndex -= width;
      }
      break;
    case 'ArrowLeft': // 37
      if (
        pacmanCurrentIndex % width !== 0 && 
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') && 
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
        ) {
        pacmanCurrentIndex -= 1;
      }
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391;
      }
      break;
    case 'ArrowRight': // 39
      if (
        pacmanCurrentIndex % width < width - 1 && 
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') && 
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
        ) {
        pacmanCurrentIndex += 1;
      }
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364;
      }
      break;
  }
  squares[pacmanCurrentIndex].classList.add('pacman');
  pacDotEaten();
  powerPelletEaten();
  checkGameOver();
  checkForWin();

}

document.addEventListener('keyup', control);

// handle pac dots eaten by pac-man
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot');
    score += 1;
    scoreDisplay.innerText = score;
  }
}

// handle power-pellet eaten by pac-man
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet');
    score += 10;
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhosts, 10000)
  }
}

function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
}

// make ghosts
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

// add ghosts to grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
});

// move ghosts around board
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function() {
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
      ) {
        squares[ghost.currentIndex].classList.remove(ghost.className); // remove ghost
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost'); // remove ghost
        ghost.currentIndex += direction; // add direction to current index
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost');
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    // if ghost is scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost');
    }
    // if pac-man strikes a scared ghost
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score += 100
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkGameOver()

  }, ghost.speed)
}

// check for game over
function checkGameOver() {
  // game is lost
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
      ) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerText = 'You Lose!'
      }

  clearInterval(moveGhost)
}

// check for game win
function checkForWin() {
  if (score === 274) {
    // stop each ghost 
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    // remove event listener
    document.removeEventListener('keyup', control)
    // score update message
    scoreDisplay.innerText = 'You Win!'
  }
}
