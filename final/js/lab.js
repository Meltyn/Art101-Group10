
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

// Mouse events for raking
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  drawRakeLines(x, y); // Start raking immediately
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

// Button Event Listeners to Change Rake Size
document.querySelectorAll('.rake-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
      const tool = e.target.dataset.tool;
      if (tool === 'small') {
          rakeSize = 5; // Small rake
      } else if (tool === 'large') {
          rakeSize = 15; // Large rake
      } else if (tool === 'erase') {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      }
  });
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
 
 document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".draggable-icon");
  const body = document.querySelector("body");

  // Drag start event: Add data to the drag event
  icons.forEach((icon) => {
    icon.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.src); // Store the image source
    });
  });

  // Enable dropping anywhere on the screen
  body.addEventListener("dragover", (e) => {
    e.preventDefault(); // Prevent default behavior to allow dropping
  });

  body.addEventListener("drop", (e) => {
    e.preventDefault();
    const imgSrc = e.dataTransfer.getData("text/plain"); // Retrieve image source
    const x = e.clientX; // Get mouse X-coordinate
    const y = e.clientY; // Get mouse Y-coordinate

    // Create an image element dynamically and place it at the drop location
    const newIcon = document.createElement("img");
    newIcon.src = imgSrc;
    newIcon.style.position = "absolute";
    newIcon.style.left = `${x - 25}px`; // Center the image horizontally
    newIcon.style.top = `${y - 25}px`; // Center the image vertically
    newIcon.style.width = "50px";
    newIcon.style.height = "50px";

    // Append the new icon to the body
    body.appendChild(newIcon);
  });
});
