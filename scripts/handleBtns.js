// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  // Event listener for the reset button
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", clearCanvas);
  
  function downloadCanvas() {
    // Check if the canvas is empty
    if (ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0)) {
        // Create a temporary canvas to draw the signature with a white background
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.fillStyle = 'white';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
    
        // Convert the signature to a JPEG image
        const signatureDataUrl = tempCanvas.toDataURL('image/jpeg');
    
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = signatureDataUrl;
        link.download = 'signature.jpg';
        link.click();
    } else {
        alert('Please draw before downloading.');
    }
}

  
  
  // Event listener for the download button
  const downloadBtn = document.getElementById("download-btn");
  downloadBtn.addEventListener("click", downloadCanvas);
  