
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
let rakeSize = 5; // Default small rake size
ctx.lineWidth = rakeSize;
ctx.lineCap = 'round'; // Makes grooves smooth

// Function to draw rake lines
function drawRakeLines(x, y) {
  for (let i = -2; i <= 2; i++) { // Create 5 lines (-2, -1, 0, 1, 2)
      ctx.beginPath();
      ctx.moveTo(x, y + i * rakeSize * 2); // Space lines based on rakeSize
      ctx.lineTo(x + 1, y + i * rakeSize * 2); // Slight horizontal movement
      ctx.strokeStyle = '#c8b191'; // Sand groove color
      ctx.stroke();
  }
}

// Undo/Redo stacks
let undoStack = [];
let redoStack = [];

// Save the current canvas state
function saveState() {
  undoStack.push(canvas.toDataURL()); // Save current canvas state as an image
  redoStack = []; // Clear redo stack when a new action occurs
}

// Function to draw rake lines
function drawRakeLines(x, y) {
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + i * rakeSize * 2); // Space lines based on rakeSize
    ctx.lineTo(x + 1, y + i * rakeSize * 2); // Slight horizontal movement
    ctx.strokeStyle = '#c8b191'; // Sand groove color
    ctx.stroke();
  }
}

// Mouse events for raking
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  saveState(); // Save state before any new drawing starts
});
canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawRakeLines(x, y);
  }
});
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseleave', () => (isDrawing = false));

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
  saveState(); // Save the current state before clearing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('undo').addEventListener('click', () => {
  undo(); // Call undo when the undo button is clicked
});

document.getElementById('redo').addEventListener('click', () => {
  if (redoStack.length > 0) {
    const lastState = redoStack.pop();
    undoStack.push(canvas.toDataURL()); // Save the current state to undo stack
    const img = new Image();
    img.src = lastState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.drawImage(img, 0, 0); // Draw the restored state
    };
  }
});

// Undo function
function undo() {
  if (undoStack.length > 0) {
    redoStack.push(canvas.toDataURL()); // Save the current state for redo
    const previousState = undoStack.pop(); // Get the last state
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.drawImage(img, 0, 0); // Restore the previous state
    };
  }
}

// event listeners for mouse
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseleave', () => (isDrawing = false));

// Event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  saveState(); // Save state for undo
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
});




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