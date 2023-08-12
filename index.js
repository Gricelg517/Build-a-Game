const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// // Character variables
let characterX = 50;
let characterY = canvas.height / 2;
const characterWidth = 30;
const characterHeight = 30;
const characterSpeed = 5;

// Background variables
let bgX = 0;
const bgSpeed = 1;

// Obstacle variables
let obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 50;
const obstacleSpeed = 3;
const obstacleGap = 200; // Gap between consecutive obstacles

// Score variable
let score = 0;

// Game loop
function gameLoop() {
  ctx.clearRect(5, 5, canvas.width, canvas.height);

    // Move the background
  bgX -= bgSpeed;
  if (bgX <= -canvas.width) {
    bgX = 0;
  }

  // Draw the background
  drawBackground();

  // Move and draw the character
  moveCharacter();
  drawCharacter();

  // Generate and move obstacles
  generateObstacles();
  moveObstacles();
  drawObstacles();

  // Check for collisions
  checkCollisions();

  // Draw the score
  drawScore();

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

// Helper functions
function drawBackground() {
  //  we'll use a simple colored background
  ctx.fillStyle = "#a8daff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
backgroundImage = new Image();
// ctx.fillStyle = href "sky.png";
}

function drawCharacter() {
  // ctx.fillStyle = "#ff4500";
  // ctx.fillRect(characterX, characterY, characterWidth, characterHeight);
}
function drawObstacles() {
    ctx.fillStyle = "#006400"; // Green color for obstacles
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    }
  }

function moveCharacter() {
    //  use arrow keys to move the character up and down
} 

function generateObstacles() {
  if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - canvas.width / 2) {
    const obstacleY = Math.random() * (canvas.height - obstacleHeight);
    const obstacle = { x: canvas.width, y: obstacleY };
    obstacles.push(obstacle);
  }
}

function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacleSpeed;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && characterY > 0) {
      characterY -= characterSpeed;
    } else if (event.key === "ArrowDown" && characterY < canvas.height - characterHeight) {
      characterY += characterSpeed;
    }
  });


  // Remove obstacles that are off-screen
  obstacles = obstacles.filter(obstacle => obstacle.x + obstacleWidth >= 0);
}

function checkCollisions() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      characterX < obstacle.x + obstacleWidth &&
      characterX + characterWidth > obstacle.x &&
      characterY < obstacle.y + obstacleHeight &&
      characterY + characterHeight > obstacle.y
    ) {
      // Collision occurred, end the game or perform any other actions
      endGame();
    } else if (obstacle.x + obstacleWidth === characterX) {
        // The character has successfully avoided an obstacle, increment the score
        score++;
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 20, 40);
}

function endGame() {

// Display the game over screen
const gameOverElement = document.getElementById("game-over");
gameOverElement.style.display = "block";
cancelAnimationFrame(animationId)
}

// Start the game loop
gameLoop();
