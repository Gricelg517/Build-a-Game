const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// // Character variables
const planeImage = new Image();
 planeImage.src = 'assets/Plane.png'; // Replace with the path to your airplane image
  const planeWidth = 40;
    const planeHeight = 40;
      const planeSpeed = 5;
        let planeX = 50;
          let planeY = canvas.height / 2;

// Background variables
let bgX = 0;
 const bgSpeed = 1;


// Obstacle variables
let obstacles = []
 const obstacleWidth = 30;
  const obstacleHeight = 30;
   const obstacleSpeed = 3;
     const obstacleGap = 100; // Gap between consecutive obstacles


// Score variable
let score = 0;
  let animationId;
    

// Game loop
function gameLoop() {
  ctx.clearRect(0, 10, canvas.width, canvas.height);

    // Move the background
  bgX -= bgSpeed;
  if (bgX <= -canvas.width) {
    bgX = 0;
  }

  // Draw the background
  drawBackground();

  // Move and draw the character
  movePlane();
  drawplane();

  // Generate and move obstacles
  generateObstacles();
   moveObstacles();
    drawObstacles();


  // Draw the score
  drawScore();
   checkCollisions();

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

// background function
function drawBackground() {
   ctx.fillStyle = "#a8daff";
     ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function drawplane() {
  ctx.drawImage(planeImage, planeX, planeY, planeWidth, planeHeight);
  
}
function drawObstacles() {
    ctx.fillStyle = "#006400"; // Green color for obstacles
     for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
       ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  }
  }
function movePlane() {
  const planeSpeed = 5;

      document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" && planeY > 0) {
        planeY -= planeSpeed;
      } else if (event.key === "ArrowDown" && planeY < canvas.height - planeHeight) {
          planeY += planeSpeed;
          
      }
    });
}

function generateObstacles() {
  if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - canvas.width / 2) {
    const obstacleY = Math.random() * (canvas.height - obstacleHeight);
      const obstacle = { x: canvas.width, y: obstacleY };
       obstacles.push(obstacle);
  }
}

function moveObstacles() {
  obstacles = obstacles.filter(obstacle => {
    obstacle.x -= obstacleSpeed;
     return obstacle.x + obstacleWidth >= 0;
  });
}
function drawScore() {
  ctx.fillStyle = "#000";
   ctx.font = "16px Arial";
   ctx.fillText(`Score: ${score}`, 10, 20);
}

function checkCollisions() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      planeX < obstacle.x + obstacleWidth &&
      planeX + planeWidth > obstacle.x &&
       planeY < obstacle.y + obstacleHeight &&
        planeY + planeHeight > obstacle.y
    ) {
      endGame();
    } else if (obstacle.x + obstacleWidth < planeX) {
        // The character has successfully avoided an obstacle, increment the score
        score++; 
    }
  }
}

function endGame() {
  cancelAnimationFrame(animationId)
  // Display the game over screen
  const gameOverElement = document.getElementById("game-over");
    gameOverElement.style.display = ("block");  
    gameOverElement.style.hidden();
}


// Start the game loop
gameLoop();
