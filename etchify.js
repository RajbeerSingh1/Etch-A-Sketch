// Selecting the elements.
const canvas = document.querySelector('#myCanvas');
const context = canvas.getContext('2d');
const resetButton = document.querySelector('#resetButton');

// Setting the canvas.
const { width, height } = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
const MOVE_AMOUNT = 20;

function roundingToNearestMultiple(number) {
  if (number % MOVE_AMOUNT === 0) {
    return number;
  }
  const rem = number % MOVE_AMOUNT;
  return number - rem;
}

x = roundingToNearestMultiple(x);
y = roundingToNearestMultiple(y);

context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 20;
let hue = 0;
context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// Drawing the initial dot.
context.beginPath();
context.moveTo(x, y);
context.lineTo(x, y);
context.stroke();

function draw(key) {
  hue += 5;
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context.beginPath();
  context.moveTo(x, y);
  switch (key) {
    case 'ArrowUp':
      if (y - MOVE_AMOUNT >= 0) y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      if (y + MOVE_AMOUNT <= height) y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      if (x - MOVE_AMOUNT >= 0) x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      if (x + MOVE_AMOUNT <= width) x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  context.lineTo(x, y);
  context.stroke();
}

function handleKeys(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw(event.key);
  }
}

function handleResetButton() {
  context.clearRect(0, 0, width, height);
  hue = 0;
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);
  x = roundingToNearestMultiple(x);
  y = roundingToNearestMultiple(y);
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y);
  context.stroke();
}

window.addEventListener('keydown', handleKeys);
resetButton.addEventListener('click', handleResetButton);
