document.addEventListener("DOMContentLoaded", () => {
  const grid = 20;
  let snake = [{ x: 10, y: 10 }];
  let food = { x: 15, y: 15 };
  let direction = "right";

  function drawSnake() {
    document.getElementById("snake").innerHTML = "";
    snake.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add("snake");
      document.getElementById("snake").appendChild(snakeElement);
    });
  }

  function drawFood() {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    document.getElementById("food").innerHTML = "";
    document.getElementById("food").appendChild(foodElement);
  }

  function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      createFood(); // Corrected invocation of createFood function
    } else {
      snake.pop();
    }
  }

  function createFood() {
    food = {
      x: Math.floor(Math.random() * grid) + 1,
      y: Math.floor(Math.random() * grid) + 1,
    };
  }

  function checkGameOver() {
    const head = snake[0];
    if (head.x < 1 || head.x > grid || head.y < 1 || head.y > grid) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function gameLoop() {
    if (checkGameOver()) {
      clearInterval(gameInterval);
      alert("Game Over!");
      return;
    }
    moveSnake();
    drawSnake();
    drawFood();
  }

  drawSnake();
  drawFood();
  const gameInterval = setInterval(gameLoop, 100);

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case "ArrowDown":
        if (direction !== "up") {
          direction = "down";
        }
        break;
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "ArrowRight":
        if (direction !== "left") {
          direction = "right";
        }
        break;
    }
  });
});
