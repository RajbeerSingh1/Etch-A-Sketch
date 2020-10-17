// Getting the elements:
const canvas = document.querySelector('#myCanvas');
const button = document.querySelector('#myButton');

// Setting the canvas for drawing:
const context = canvas.getContext('2d');
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 15;
let hue = 0;
context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
const { width, height } = canvas;
console.log(width, height);
const MOVE_DISTANCE = 10;
let x = Math.ceil(Math.random() * width);
let y = Math.ceil(Math.random() * height);

// Starting the drawing:
context.beginPath();
context.moveTo(x, y);
context.lineTo(x, y);
context.stroke();

// Draw Function:
function draw({ key }) {
  hue += 5;
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context.beginPath();
  context.moveTo(x, y);
  switch (key) {
    case 'ArrowUp':
      if (y - MOVE_DISTANCE >= 0) {
        y -= MOVE_DISTANCE;
      }
      break;
    case 'ArrowDown':
      if (y + MOVE_DISTANCE <= height) {
        y += MOVE_DISTANCE;
      }
      break;
    case 'ArrowLeft':
      if (x - MOVE_DISTANCE >= 0) {
        x -= MOVE_DISTANCE;
      }
      break;
    case 'ArrowRight':
      if (x + MOVE_DISTANCE <= width) {
        x += MOVE_DISTANCE;
      }
      break;
    default:
      break;
  }
  context.lineTo(x, y);
  context.stroke();
}

// Keyboard Event Listener:
function keyboardEventHandler(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw({ key: event.key });
  }
}

window.addEventListener('keydown', keyboardEventHandler);

// Clearing the Canvas:
button.addEventListener('click', function () {
  context.clearRect(0, 0, width, height);
});
