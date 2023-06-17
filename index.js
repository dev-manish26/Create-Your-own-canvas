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
  
// Function to start drawing
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCursorPosition(e);
    [lastX, lastY] = [x, y];
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
    isDrawing = false;
}
  

// Event listeners for mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listener for the reset button
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", clearCanvas);

// Function to download the canvas as an image
function downloadCanvas() {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "signature.png";
  link.click();
}

// Event listener for the download button
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", downloadCanvas);
