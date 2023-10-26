//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreElement = document.getElementById("score");
let snakeSpeed = 100; // Speed of the snake in milliseconds
let direction = "right";
let score = 0;

// Initialize the snake position
let snake = [{ row: 20, col: 1 }];

// Initialize food position
let food = { row: 10, col: 10 };

// Function to update the game grid
function updateGameGrid() {
  gameContainer.innerHTML = "";

  // Create the snake
  snake.forEach(segment => {
    const snakePixel = document.createElement("div");
    snakePixel.className = "snakeBodyPixel";
    snakePixel.style.gridColumn = segment.col;
    snakePixel.style.gridRow = segment.row;
    gameContainer.appendChild(snakePixel);
  });

  // Create the food
  const foodPixel = document.createElement("div");
  foodPixel.className = "food";
  foodPixel.style.gridColumn = food.col;
  foodPixel.style.gridRow = food.row;
  gameContainer.appendChild(foodPixel);
}

// Function to move the snake
function moveSnake() {
  let head = { ...snake[0] };

  // Move the head in the current direction
  if (direction === "right") head.col++;
  if (direction === "left") head.col--;
  if (direction === "up") head.row--;
  if (direction === "down") head.row++;

  // Check for collision with food
  if (head.row === food.row && head.col === food.col) {
    score++;
    scoreElement.textContent = score;
    generateFood();
  } else {
    // Remove the tail of the snake if no food is eaten
    snake.pop();
  }

  // Check for game over conditions (e.g., collision with the wall or itself)
  if (
    head.row < 1 || head.row > 40 ||
    head.col < 1 || head.col > 40 ||
    snake.some(segment => segment.row === head.row && segment.col === head.col)
  ) {
    alert("Game Over!");
    location.reload(); // Reload the page to restart the game
    return;
  }

  // Add the new head
  snake.unshift(head);

  updateGameGrid();
}

// Function to generate new food
function generateFood() {
  food = {
    row: Math.floor(Math.random() * 40) + 1,
    col: Math.floor(Math.random() * 40) + 1
  };
}

// Start the game loop
setInterval(moveSnake, snakeSpeed);

// Handle keyboard input to change direction
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Initialize the game
updateGameGrid();
generateFood();
