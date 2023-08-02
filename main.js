// Project : Snake Game
const btns = document.querySelectorAll(".controll span");
const [topBtn, downBtn, rightBtn, leftBtn] = btns;
const snake = document.querySelector(".snake");
const food = document.querySelector(".food");
const display = document.querySelector(".display");
const score = document.querySelector(".info p:first-child span");
const highScore = document.querySelector(".info p:last-child span");

randomFoodPosition(); // Generate initial position for the food
score.textContent = 0; // Set initial score to 0
highScore.textContent = localStorage.getItem("highScore") || 0; // Retrieve high score from local storage or set to 0

btns.forEach((btn) => btn.addEventListener("click", moveSnake)); // Add event listeners to control buttons

// Function to handle snake movement
function moveSnake() {
  const direction = this.getAttribute("direction"); // Get the direction attribute of the clicked button
  const increment = this === downBtn || this === rightBtn ? 20 : -20; // Calculate the increment based on the direction

  const interval = setInterval(() => {
    btns.forEach((btn) => (btn.onclick = () => clearInterval(interval))); // Clear the interval when a button is clicked

    if (
      getPositon(snake, "x") === getPositon(food, "x") &&
      getPositon(snake, "y") === getPositon(food, "y")
    ) {
      // Check if the snake has collided with the food
      score.textContent++; // Increment the score
      console.log("modify snake");
      randomFoodPosition(); // Generate new position for the food
    }

    const left = getDirection(snake, "left");
    const top = getDirection(snake, "top");
    const displayWidth = getDirection(display, "width");
    const displayHeight = getDirection(display, "height");

    if (
      left < 0 ||
      left > displayWidth - 20 ||
      top < 0 ||
      top > displayHeight - 20
    ) {
      // Check if the snake has collided with the boundaries of the display
      clearInterval(interval); // Clear the interval
      if (localStorage.getItem("highScore") < score.textContent) {
        localStorage.setItem("highScore", score.textContent); // Update the high score in local storage
      }
      alert("Game Over"); // Display game over message
      location.reload(); // Reload the page to start a new game
    } else {
      snake.style[direction] =
        getDirection(snake, direction) + increment + "px"; // Move the snake in the specified direction
    }
  }, 200); // Set the interval for snake movement
}

// Helper function to get computed style property value of an element
function getDirection(element, dir) {
  return parseInt(getComputedStyle(element)[dir]);
}

// Helper function to get position of an element
function getPositon(element, opt) {
  return parseInt(element.getBoundingClientRect()[opt]);
}

// Helper function to generate a random number in multiples of 20 within a range
function getRandom20(min, max) {
  return getRandomInt(min / 20, max / 20) * 20;
}

// Helper function to generate a random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}

// Helper function to generate random food position
function randomFood(sens) {
  return getRandom20(20, getDirection(display, sens) - 20);
}

// Function to set random position for the food
function randomFoodPosition() {
  food.style.top = randomFood("height") + "px";
  food.style.left = randomFood("width") + "px";
}

// Event listener for arrow key press
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowDown":
      downBtn.click(); //  Trigger click event for the down button
      break;
    case "ArrowUp":
      topBtn.click(); // Trigger click event for the top button
      break;
    case "ArrowLeft":
      leftBtn.click(); // Trigger click event for the left button
      break;
    case "ArrowRight":
      rightBtn.click(); // Trigger click event for the right button
      break;
    default:
      break;
  }
});

/* 
? This code uses the  getBoundingClientRect()  method to get the position and dimensions of 
? the snake element

?The  getComputedStyle()  method in JavaScript is used to get the final style of an element. 
?It gives you the actual values of CSS properties after considering stylesheets, inline styles,
?and inherited styles. It's commonly used to access the modified values of CSS properties.
 */

// * This is my first Try, and i am proud of it
// todo : update the snake movement
