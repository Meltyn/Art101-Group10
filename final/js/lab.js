
// Author: Autania Mierow
// Date: 7 November 2024

document.addEventListener("DOMContentLoaded", () => {
  const affirmationText = document.getElementById("affirmation-text");
  const affirmations = [
      "You are exactly where you need to be.",
      "Breathe in peace, breathe out worry.",
      "Each moment is a fresh beginning.",
      "You are capable of amazing things."
  ];

  // Change affirmations daily
  affirmationText.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
});

// Sand Raking Logic
const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Variables for raking
let lastX = null; // Store the last mouse X position
let lastY = null; // Store the last mouse Y position

// Function to draw rake lines smoothly
function drawRakeLines(x, y) {
  // If this is the first movement, initialize lastX and lastY
  if (lastX === null || lastY === null) {
    lastX = x;
    lastY = y;
  }

  // Calculate the direction vector
  const dx = x - lastX;
  const dy = y - lastY;

  // Avoid dividing by zero; ensure movement exists
  const length = Math.sqrt(dx * dx + dy * dy) || 1;

  // Normalize the direction vector to calculate the perpendicular vector
  const perpX = (dy / length) * rakeSize * 2; // Perpendicular X
  const perpY = -(dx / length) * rakeSize * 2; // Perpendicular Y

  // Draw multiple rake lines (parallel grooves)
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();

    // Offset each rake line using the perpendicular vector
    const offsetX = perpX * i;
    const offsetY = perpY * i;

    ctx.moveTo(lastX + offsetX, lastY + offsetY); // Start of the line
    ctx.lineTo(x + offsetX, y + offsetY); // End of the line

    ctx.strokeStyle = '#c8b191'; // Sand groove color
    ctx.lineWidth = rakeSize / 2; // Make grooves thinner
    ctx.stroke();
  }

  // Update the last position
  lastX = x;
  lastY = y;
}

// Event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  saveState(); // Save the current state for undo

  // Capture the initial position
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;

  // Draw the first rake lines
  drawRakeLines(lastX, lastY);
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawRakeLines(x, y);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  lastX = null; // Reset last position
  lastY = null;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
  lastX = null; // Reset last position
  lastY = null;
});

// undo/redo stacks
let undoStack = [];
let redoStack = [];
// save current canvas state
function saveState() {
  undoStack.push(canvas.toDataURL());
  redoStack = [];
}

// Button actions
document.getElementById('smallRake').addEventListener('click', () => {
  rakeSize = 5; // Small rake size
  ctx.lineWidth = rakeSize;
});

document.getElementById('mediumRake').addEventListener('click', () => {
  rakeSize = 9; // Medium rake size
  ctx.lineWidth = rakeSize;
});

document.getElementById('largeRake').addEventListener('click', () => {
  rakeSize = 12; // Large rake size
  ctx.lineWidth = rakeSize;
});

document.getElementById('erase').addEventListener('click', () => {
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('undo').addEventListener('click', () => {
  undo(); // Call the corrected undo function
});

function undo() {
  if (undoStack.length > 0) {
    redoStack.push(canvas.toDataURL());
    const previousState = undoStack.pop();
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
}



 // Reflection Space Logic
 const reflectionInput = document.getElementById("reflection-input");
 const releaseButton = document.getElementById("release-button");
 const reflectionMessage = document.getElementById("reflection-message");

 releaseButton.addEventListener("click", () => {
   const input = reflectionInput.value.trim();
   if (input) {
     reflectionInput.value = "";
     reflectionMessage.textContent =
       "Let your thoughts flow like water. That thought has passed now down the river into the unknown.";
     reflectionMessage.style.display = "block";
     setTimeout(() => {
       reflectionMessage.style.display = "none";
     }, 4000);
   }
 });


 
 // Select the button and audio elements using their IDs
const playButton = document.getElementById('playButton');
const audioElement = document.getElementById('myAudio');

// Add a click event listener to the button
playButton.addEventListener('click', function() {
    // Play the audio when the button is clicked
    audioElement.play();
});