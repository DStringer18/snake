//credit: https://medium.com/@anMagpie/simple-snake-game-in-html-and-javascript-ed78cffac36

let canvas;
let ctx;
let x;
let gameEnded = false;
let changingDirection = false;

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', () => {
  init();
  resetButton.setAttribute('disabled', true);
})

init = () => {
  console.log('game initialized')
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  tailSize = defaultTailSize;
  x = 8;
  setInterval(draw, 1000 / x);
  changingDirection = false;
}

document.addEventListener("keydown", changeDirection);

window.onload = function() {
  init();
}

//game world
let gridSize = (tileSize = 20); // 20 x 20 = 400
//horizontal velocity
let nextX = 0;
//vertical velocity
let nextY = 0;

//snake
const defaultTailSize = 3;
let tailSize = defaultTailSize;
let snakeTrail = [];
let snakeX = (snakeY = 10);

//apple
let appleX = (appleY = 15);

//draw
const draw = () => {
  //move snake to next position
  snakeX += nextX;
  snakeY += nextY;

  // snake over game world?
  if (snakeX < 0) {
    gameEnded = true;
    console.log('snakeX is less than 0');
  }
  if (snakeX > gridSize - 1) {
    gameEnded = true;  
    console.log('snakeX is greater than 20')
  }
  if (snakeY < 0) {
    gameEnded = true;  
    console.log('snakeY is less than 0')
  }
  if (snakeY > gridSize - 1) {
    gameEnded = true;
    console.log('snakeY is greater than 20')
  }

  //snake bite apple?
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  //paint background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint snake
  ctx.fillStyle = "green";
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );
    
    //console.log(snakeTrail[i].x == snakeX);
    //console.log(snakeTrail[i].y == snakeY);
  
    /*snake bites it's tail?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      gameEnded = true;
      console.log('snake bit its tail')
    }
    endGame();*/
  }

  // paint apple
  ctx.filStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

//end game 
const endGame = () => {
  if (gameEnded) {
    clearInterval(draw);
    document.removeEventListener("keydown", changeDirection);
    tailSize = defaultTailSize;
    resetButton.removeAttribute('disabled');
    console.log('game ended')}
}

// input
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;
  console.log(keyPressed)

  const goingUp = nextY === -1;
  const goingDown = nextY === 1;
  const goingRight = nextX === 1;
  const goingLeft = nextX === -1;

  if (keyPressed === LEFT_KEY && !goingRight) {
    nextX = -1;
    nextY = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    nextX = 0;
    nextY = -1;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    nextX = 1;
    nextY = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    nextX = 0;
    nextY = 1;
  }
}