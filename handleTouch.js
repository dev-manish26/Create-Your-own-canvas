// Variables to track touch state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to handle touch start event
function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const { clientX, clientY } = touch;
  const rect = e.target.getBoundingClientRect();
  const offsetX = clientX - rect.left;
  const offsetY = clientY - rect.top;
  
  isDrawing = true;
  [lastX, lastY] = [offsetX, offsetY];
}

// Function to handle touch move event
function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  
  const touch = e.touches[0];
  const { clientX, clientY } = touch;
  const rect = e.target.getBoundingClientRect();
  const offsetX = clientX - rect.left;
  const offsetY = clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
  
  [lastX, lastY] = [offsetX, offsetY];
}

// Function to handle touch end event
function handleTouchEnd() {
  isDrawing = false;
}

// Add touch event listeners to the canvas element
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd);
