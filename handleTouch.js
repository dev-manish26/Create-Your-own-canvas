// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variables to track touch state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to get the cursor position relative to the canvas
function getTouchPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;

  return { x: offsetX, y: offsetY };
}

// Function to handle touch start event
function handleTouchStart(e) {
  e.preventDefault();
  const { x, y } = getTouchPosition(e);
  [lastX, lastY] = [x, y];
  isDrawing = true;
}

// Function to handle touch move event
function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  
  const { x, y } = getTouchPosition(e);
  
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
