// function initGame() {
//   // ? Get HTML Elements
//   const grid = document.querySelector(".grid");
//   const resetBtn = document.querySelector("button");

//   // ? Create Variables
//   const width = 20;
//   const height = 20;
//   const totalCells = width * height;
//   let cells = [];
//   let direction = 1;

//   // ? Create food and starting point variables
//   //   let food = Math.floor(Math.random() * 400);
//   let food ;
//   const startingPosition = 0;
//   let currentPosition = startingPosition;
//   console.log(currentPosition)
// //   console.log(currentPosition)
// //   let currentSnake = [];
// // let snakeStartPosition = [0]
// // console.log(snakeStartPosition)

//   // ? Declare Functions
//   function createGrid() {
//     for (let i = 0; i < totalCells; i++) {
//       const cell = document.createElement("div");
//       //   console.log(cell);
//       cell.innerText = i;
//       cell.dataset.index = i;
//       //   adding styles to each cell
//       cell.style.height = `${100 / height}%`;
//       cell.style.width = `${100 / width}%`;
//       //   append to grid
//       grid.appendChild(cell);
//       cells.push(cell);
//     }

//     // snakeStartPosition.forEach(snake => cells[snake].classList.add('snake'))

//     // addFood(food);
//     generateRandomFood();

//     // console.log(food)
//     addSnake(currentPosition);
//     // addSnake(snakeStartPosition)
//     // addSnake(currentSnake)
//     // console.log(currentPosition)
//   }

//   function generateRandomFood() {
//     food = Math.floor(Math.random() * 400);
//     cells[food].classList.add("snakeFood");
//     console.log(food);
//     // return food
//     // eatFood()
//   }

//   // function removeFood(foodPosition, currentPosition) {
//   //   if (foodPosition === currentPosition) {
//   //     cells[foodPosition].classList.remove("snakeFood");
//   //   }
//   // }
// function removeFood(food) {
//     cells[food].classList.remove('snakeFood')
// }

//   function addSnake(position) {
//     // currentSnake.forEach(snake => cells[snake].classList.add('snake'))
//     // snakeStartPosition.forEach(snake => )
//     cells[position].classList.add("snake");
//   }

//   function removeSnake(position) {
//     cells[position].classList.remove("snake");
//   }

//   function handleMove(e) {
//     // console.log(e.key)
//     const key = e.key;
//     const up = "ArrowUp";
//     const down = "ArrowDown";
//     const right = "ArrowRight";
//     const left = "ArrowLeft";

//     // let tail = snakeStartPosition.pop()
//     // console.log(tail)
//     // let head = snakeStartPosition.unshift(tail)
//     // console.log(head)
//     // removeSnake(tail)

//     removeSnake(currentPosition);
//     eatFood()

//     if (key === right && currentPosition % width !== width - 1) {
//       currentPosition++;
//     // let tail = currentSnake.pop()
//     // cells[tail].classList.remove('snake')
//     // currentSnake.unshift(currentSnake[0] + direction)
//     // cells[currentSnake[0]].classList.add('snake')
//     // console.log(currentSnake)
//     //   console.log(currentPosition);
//     } else if (key === left && currentPosition % width !== 0) {
//       currentPosition--;
//     //   console.log(currentPosition);
//     } else if (key === up && currentPosition % width !== currentPosition) {
//       currentPosition -= width;
//     //   console.log(currentPosition);
//     } else if (key === down && currentPosition + width <= totalCells - 1) {
//       currentPosition += width;
//     //   console.log(currentPosition);
//     }

//     // if (key === right) {

//     // }
//     else {
//       console.log("invalid key");
//     }
//     // console.log(currentPosition)
//     // console.log(food, currentPosition)
//     // console.log('width--->',width, 'currPosition--->',currentPosition, 'currPosition % width--->', currentPosition % width)
//     // addSnake(currentPosition);
//     addSnake(currentPosition)
//   }

//   // generateRandomFood()

//   function eatFood() {
//     // removeFood(food, currentPosition);
//     // currentPosition++
//     // generateRandomFood()
//     if (food === currentPosition) {
//       removeFood(food)
//       generateRandomFood()
//     }
//   }

//   // ? add Event Listeners
//   document.addEventListener("keydown", handleMove)

//   // ? Invoke Functions
//   createGrid();
//   eatFood(food, currentPosition)
// }

// window.addEventListener('DOMContentLoaded', initGame)

function initGame() {
  // ? Get HTML Elements
  const grid = document.querySelector(".grid");
  const resetBtn = document.querySelector("#resetBTN");
  const score = document.querySelector('#spannedScore')
  const highScore = document.querySelector('#highScore')
  const gameOverText = document.querySelector('.gameOver')
  // console.log(score.innerHTML)
  // console.log(highScore.innerHTML)

  // ? Create Variables
  const width = 20;
  const height = 20;
  const totalCells = width * height;
  let cells = [];
  let direction = 1;
  let interval = 300;
  let snakeInterval;
  let isGameOver = false;
  let intervalTime = 0;
  let speed = 0.9;
  let currentScore = 0

  // ? Sound variables
  let eatFoodSound = new Audio ('712054__lotcsystems__swallow-delicious-food-[AudioTrimmer.com].mp3')
  eatFoodSound.volume = .1
  let gameLoopSound = new Audio('651670__code_box__desert-snake.wav')
  gameLoopSound.volume = .05
  let gameOverSound = new Audio('703542__yoshicakes77__dead.ogg')
  gameOverSound.volume = .05


  // console.log(cells)

  // ? Create food and starting point variables
  let food;
  let snakeStartPosition = [23, 22, 21];
  let currentPosition = snakeStartPosition;

  // currentPosition.forEach(snake => {
  //   console.log(snake)
  // })

  // ? Declare Functions
  function startGame() {
    createGrid();
    document.addEventListener("keydown", handleMove);
  }
  

  function createGrid() {
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      // cell.innerText = i;
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
    borderCells()

  }

  function borderCells() {
    for (let i= 0; i < cells.length; i++) {
      if (i < width || i % width === 0 ||
        i > (width ** 2)- width - 1 ||
        i % width === width - 1) {
          cells[i].classList.add('border')
          cells[i].classList.add('main')
          if (cells[i].classList.contains('snakeFood') && cells[i].classList.contains('border')) {
            console.log('food in border')
            // cells[i].classList.remove('snakeFood')
            // cells[i].classList.add('squaredFood')
            removeFood()
            generateRandomFood()
          } 
        }
    }
  }

  function generateRandomFood() {
    food = Math.floor(Math.random() * 400);
    cells[food].classList.add("snakeFood");

    // for (let i = 0; i < cells.length; i++) {
    //   if (cells[i].classList.contains('border') && ) {
    //     console.log(cells[i])
    //     // removeFood()
    //   }
    // }

    // console.log(food);
  }

  function removeFoodFromSnake() {
    for (let i=0 ; i < cells.length ; i++) {
      if (cells[i].classList.contains('snake') && cells[i].classList.contains('snakeFood')){
        console.log('food in snake')
        cells[i].classList.add('transitionFood')
        // currentScore--
        removeFood()
        generateRandomFood()
      }
    }
  }

  function removeFood() {
    cells[food].classList.remove("snakeFood");
    // if (cells[])
  }

  // position
  function addSnake() {
    currentPosition.forEach((snake) => cells[snake].classList.add("snake"));
      // let snakeBody = currentPosition.slice(1)
      // cells[currentPosition[0]].classList.add('snakeHead')
      // snakeBody.forEach(part => cells[part].classList.add('snake'))
  }

  function removeSnake() {
    currentPosition.forEach((snake) => {
      cells[snake].classList.remove("snake");
    });
    // cells[position].classList.remove("snake");
  }

  function moveSnake() {
    clearInterval(snakeInterval)
    snakeInterval = setInterval(() => {
    gameLoopSound.play()
    gameLoopSound.loop = true
      borderCells()
      removeFoodFromSnake()
      let tail = currentPosition.pop();
      cells[tail].classList.remove("snake");
      removeSnake()
      currentPosition.unshift(currentPosition[0] + direction);
      addSnake();
      eatFood();
      checkCollision();
      // new Audio(sound).play()
    }, interval)
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
    // console.log('width--->',width, 'currPosition--->',currentPosition[0], 'currPosition % width--->', currentPosition[0] % width)

  }

  function eatFood() {
      if (food === currentPosition[0]) {
        eatFoodSound.play()
        removeFood();
        generateRandomFood();
        let tail = currentPosition[currentPosition.length - 1]
        currentPosition.push(tail)
        currentScore++
        score.innerHTML = currentScore
        if (score.innerHTML !== '0') {
          score.classList.add('popUpScore')
        }
        clearInterval(snakeInterval)
        interval = interval * speed
        snakeInterval = setInterval(moveSnake, interval)
      }
  }



  function checkCollision() {
    // const currentX = currentPosition[0] % width;
    // const currentY = Math.floor(currentPosition[0] / width)
    let slicedSnake = currentPosition.slice(1);
    slicedSnake.forEach((slice) => {
      if (currentPosition[0] === slice) {
        isGameOver = true
        gameOver();
      }
    })
    if (
      // (currentX === 19 && direction === 1) ||
      // (currentX === 0 && direction === -1) ||
      // (currentY === 0 && direction === -20) ||
      // (currentY === 19 && direction === 20)
      (currentPosition[0] % width === width - 1 && direction === 1) ||
      (currentPosition[0] - width < 0 && direction === -width) ||
      (currentPosition[0] % width === 0 && direction === -1) ||
      (currentPosition[0] + width >= width * width && direction === +width)
    ) {
      isGameOver = true
      gameOver();
    }
  }

  function resetGame() {
    isGameOver = false
    gameOverText.classList.remove('open')
    grid.innerHTML= ''
    score.innerHTML = '0'
    score.classList.remove('popUpScore')
    initGame()
  }

  
  function gameOver() {
    if (isGameOver) {
      console.log("Game Over");
      gameLoopSound.pause()
      gameOverSound.play()
      // scoresArr.push(parseInt(currentScore))
      // console.log(scoresArr)
      document.removeEventListener('keydown', handleMove)
      gameOverText.classList.add('open')
      clearInterval(snakeInterval)
      // let greaterScore = scoresArr.reduce((accumulator, currValue) => {
      //   if (currValue > accumulator) {
      //     return currValue
      //   } else {
      //     return accumulator
      //   }
      // }, 0)
      
      // console.log(greaterScore)
      // highScore.innerHTML = greaterScore
      // highScore.classList.add('popUpScore')
    }
  }
  
  
  // ? add Event Listeners
  resetBtn.addEventListener('click', resetGame)
  
  // ? Invoke Functions
  // createGrid();
  startGame();
  // gameOver()
}
// let scoresArr = []


window.addEventListener("DOMContentLoaded", initGame);
