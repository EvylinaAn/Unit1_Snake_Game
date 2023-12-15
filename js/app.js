function initGame() {
  // ? Get HTML Elements
  const grid = document.querySelector(".grid");
  const resetBtn = document.querySelector("#resetBTN");
  const score = document.querySelector("#spannedScore");
  const highScore = document.querySelector("#highScore");
  const gameOverText = document.querySelector(".gameOver");

  // ? Create Variables
  const width = 20;
  const height = 20;
  const totalCells = width * height;
  let cells = [];
  let direction = 1;
  let interval = 300;
  let snakeInterval;
  let isGameOver = false;
  let speed = 0.9;
  let currentScore = 0;

  // ? Sound variables
  let eatFoodSound = new Audio(
    "712054__lotcsystems__swallow-delicious-food-[AudioTrimmer.com].mp3"
  );
  eatFoodSound.volume = 0.1;
  let gameLoopSound = new Audio("651670__code_box__desert-snake.wav");
  gameLoopSound.volume = 0.07;
  let gameOverSound = new Audio("703542__yoshicakes77__dead.ogg");
  gameOverSound.volume = 0.07;

  // ? Create food and starting point variables
  let food;
  let snakeStartPosition = [23, 22, 21];
  let currentPosition = snakeStartPosition;

  // ? Declare Functions
  function startGame() {
    createGrid();
    document.addEventListener("keydown", handleMove);
  }

  function createGrid() {
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.dataset.index = i;
      //   adding styles to each cell
      cell.style.height = `${100 / height}%`;
      cell.style.width = `${100 / width}%`;
      //   append to grid
      grid.appendChild(cell);
      cells.push(cell);
    }
    generateRandomFood();
    addSnake(currentPosition);
    borderCells();
  }

  function borderCells() {
    for (let i = 0; i < cells.length; i++) {
      if (
        i < width ||
        i % width === 0 ||
        i > width ** 2 - width - 1 ||
        i % width === width - 1
      ) {
        cells[i].classList.add("border");
        if (
          cells[i].classList.contains("snakeFood") &&
          cells[i].classList.contains("border")
        ) {
          console.log("food in border");
          removeFood();
          generateRandomFood();
        }
      }
    }
  }

  function randomFoodColor() {
    const red = Math.floor(Math.random() * 255) + 50;
    const green = Math.floor(Math.random() * 255) + 50;
    const blue = Math.floor(Math.random() * 255) + 50;
    const opacity = 1;
    return (randomColor = `rgb(${red}, ${green}, ${blue}, ${opacity})`);
  }

  function generateRandomFood() {
    food = Math.floor(Math.random() * 400);
    cells[food].classList.add("snakeFood");
    cells[food].style.backgroundColor = randomFoodColor();
  }

  function removeFoodFromSnake() {
    for (let i = 0; i < cells.length; i++) {
      if (
        cells[i].classList.contains("snake") &&
        cells[i].classList.contains("snakeFood")
      ) {
        console.log("food in snake");
        removeFood();
        generateRandomFood();
      }
    }
  }

  function removeFood() {
    cells[food].classList.remove("snakeFood");
    cells[food].style.backgroundColor = "";
  }

  let snakeHead = currentPosition[0];
  let snakeBody = currentPosition.slice(1);

  function addSnake() {
    // currentPosition.forEach((snake) => cells[snake].classList.add("snake"));
    const [snakeHead, ...snakeBody] = currentPosition;
    cells[snakeHead].classList.add("snakeHead");
    snakeBody.forEach((snakeIndex) => {
      cells[snakeIndex].classList.add("snake");
    });
  }

  function removeSnake() {
    // currentPosition.forEach((snake) => cells[snake].classList.remove("snake"));
    const [snakeHead, ...snakeBody] = currentPosition;
    cells[snakeHead].classList.remove("snakeHead");
    snakeBody.forEach((snakeIndex) => {
      cells[snakeIndex].classList.remove("snake");
    });
  }

  function moveSnake() {
    clearInterval(snakeInterval);
    snakeInterval = setInterval(() => {
      gameLoopSound.play();
      gameLoopSound.loop = true;
      borderCells();
      removeFoodFromSnake();
      let tail = currentPosition.pop();
      cells[tail].classList.remove("snake");
      removeSnake();
      currentPosition.unshift(currentPosition[0] + direction);
      addSnake();
      eatFood();
      checkCollision();
    }, interval);
  }

  function handleMove(e) {
    const key = e.key;
    const up = "ArrowUp";
    const down = "ArrowDown";
    const right = "ArrowRight";
    const left = "ArrowLeft";

    if (
      key === right &&
      currentPosition[0] % width !== width - 1 &&
      direction !== -1
    ) {
      direction = 1;
      moveSnake();
    } else if (
      key === left &&
      currentPosition[0] % width !== 0 &&
      direction !== 1
    ) {
      direction = -1;
      moveSnake();
    } else if (
      key === up &&
      currentPosition[0] % width !== currentPosition[0] &&
      direction !== width
    ) {
      direction = -20;
      moveSnake();
    } else if (
      key === down &&
      currentPosition[0] + width <= totalCells - 1 &&
      direction !== -width
    ) {
      direction = +20;
      moveSnake();
    }
  }

  function eatFood() {
    if (food === currentPosition[0]) {
      eatFoodSound.play();
      removeFood();
      generateRandomFood();
      let tail = currentPosition[currentPosition.length - 1];
      currentPosition.push(tail);
      currentScore++;
      score.innerHTML = currentScore;
      if (score.innerHTML !== "0") {
        score.classList.add("popUpScore");
      }
      clearInterval(snakeInterval);
      interval = interval * speed;
      snakeInterval = setInterval(moveSnake, interval);
    }
  }

  function checkCollision() {
    let slicedSnake = currentPosition.slice(1);
    slicedSnake.forEach((slice) => {
      if (
        currentPosition[0] === slice ||
        (currentPosition[0] % width === width - 1 && direction === 1) ||
        (currentPosition[0] - width < 0 && direction === -width) ||
        (currentPosition[0] % width === 0 && direction === -1) ||
        (currentPosition[0] + width >= width * width && direction === +width)
      ) {
        isGameOver = true;
        gameOver();
      }
    });
  }

  function resetGame() {
    gameOverText.classList.remove("open");
    isGameOver = false;
    grid.innerHTML = "";
    score.innerHTML = "0";
    score.classList.remove("popUpScore");
    initGame();
  }

  function gameOver() {
    if (isGameOver) {
      document.removeEventListener("keydown", handleMove);
      gameLoopSound.pause();
      gameOverSound.play();
      scoresArr.push(parseInt(currentScore));
      gameOverText.classList.add("open");
      clearInterval(snakeInterval);
      let greaterScore = scoresArr.reduce((accumulator, currValue) => {
        if (currValue > accumulator) {
          return currValue;
        } else {
          return accumulator;
        }
      }, 0);
      highScore.innerHTML = greaterScore;
      highScore.classList.add("popUpScore");
    }
  }

  // ? add Event Listeners
  resetBtn.addEventListener("click", resetGame);

  // ? Invoke Functions
  startGame();
}

let scoresArr = [];
window.addEventListener("DOMContentLoaded", initGame);
