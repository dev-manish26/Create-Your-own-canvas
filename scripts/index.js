// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the initial drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to get the cursor position relative to the canvas
function getCursorPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const offsetX = (e.clientX - rect.left) * scaleX;
    const offsetY = (e.clientY - rect.top) * scaleY;
    
    return { x: offsetX, y: offsetY };
}
  
/// Function to start drawing
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCursorPosition(e);
    [lastX, lastY] = [x, y];
    [startX, startY] = [x, y];
}

 
// Function to draw
function draw(e) {
    if (!isDrawing) return;
    
    const { x, y } = getCursorPosition(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    [lastX, lastY] = [x, y];
}
  
// Function to stop drawing
function stopDrawing() {
    if (!isDrawing) return;
    
    // Check if the user has drawn a line
    const isLineDrawn = lastX !== startX || lastY !== startY;
    
    if (!isLineDrawn) {
        // Draw a dot at the initial cursor position
        ctx.beginPath();
        ctx.arc(startX, startY, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    isDrawing = false;
}


  

// Event listeners for mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

