// // Get a reference to the canvas element
// const canvas = document.getElementById("myCanvas");

// // Get the 2D drawing context of the canvas
// const ctx = canvas.getContext("2d");

// // Create a variable to track the touch position
// let prevX, prevY;

// // Create a flag to indicate if the user is drawing
// let isDrawing = false;

// Add touch event listeners
canvas.addEventListener("touchstart", handleTouchStart, false);
canvas.addEventListener("touchmove", handleTouchMove, false);
canvas.addEventListener("touchend", handleTouchEnd, false);

// Handle touch start event
function handleTouchStart(event) {
  // Prevent default touch behavior
  event.preventDefault();
  
  // Get the touch position relative to the canvas element
  const rect = canvas.getBoundingClientRect();
  const touch = event.touches[0];
  prevX = touch.clientX - rect.left;
  prevY = touch.clientY - rect.top;
  
  // Start drawing
  isDrawing = true;
}

// Handle touch move event
function handleTouchMove(event) {
  // Prevent default touch behavior
  event.preventDefault();
  
  if (isDrawing) {
    // Get the touch position relative to the canvas element
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    
    // Draw a line from the previous point to the current point
    drawLine(prevX, prevY, currentX, currentY);
    
    // Update the previous position
    prevX = currentX;
    prevY = currentY;
  }
}

// Handle touch end event
function handleTouchEnd(event) {
  // Prevent default touch behavior
  event.preventDefault();
  
  // Stop drawing
  isDrawing = false;
  
  // If the user just tapped the screen without drawing a line, draw a dot
  if (!isDrawing) {
    drawDot(prevX, prevY);
  }
}

// Custom function to draw a dot at the specified position
function drawDot(x, y) {
  // Set the dot style
  ctx.fillStyle = "black";
  
  // Draw a dot at the specified position
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2, false);
  ctx.fill();
}

// Custom function to draw a line between two points
function drawLine(startX, startY, endX, endY) {
  // Set the line style
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  
  // Begin a new path
  ctx.beginPath();
  
  // Move to the starting point
  ctx.moveTo(startX, startY);
  
  // Draw a line to the ending point
  ctx.lineTo(endX, endY);
  
  // Stroke the line
  ctx.stroke();
}
