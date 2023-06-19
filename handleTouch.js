// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variables to track touch state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to get the cursor position relative to the canvas
function getTouchPosition(canvas, touchEvent) {
  const rect = canvas.getBoundingClientRect();
  const touch = touchEvent.targetTouches[0];
  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;

  return { x: offsetX, y: offsetY };
}

// Function to handle touch start event
function handleTouchStart(e) {
  e.preventDefault();
  const touchPos = getTouchPosition(canvas, e);
  [lastX, lastY] = [touchPos.x, touchPos.y];
  isDrawing = true;
}

// Function to handle touch move event
function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  
  const touchPos = getTouchPosition(canvas, e);
  const { x, y } = touchPos;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  [lastX, lastY] = [x, y];
}

// Function to handle touch end event
function handleTouchEnd(e) {
  isDrawing = false;
}

// Add touch event listeners to the canvas element
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd);
