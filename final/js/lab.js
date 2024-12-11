
// Author: Autania Mierow, Bryan Galvan
// Date: 9 November 2024

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

// Breathing bubble function
const bubble = document.querySelector(".bubble");
const text = document.querySelector(".breathing-text");

// Define breathing phases
const phases = ["Inhale", "Hold", "Exhale", "Hold"];
const phaseDurations = [4000, 4000, 4000, 4000]; // Each phase is 4s

let currentPhase = 0;

function updateBreathing() {
  text.textContent = phases[currentPhase]; // Update the text
  currentPhase = (currentPhase + 1) % phases.length; // Loop through phases
}

// Start the phase updates in sync with the animation
setInterval(updateBreathing, 4000); // Matches phase duration (16s / 4 phases)

// Initialize the first phase
updateBreathing();

// Reflection Space Logic
const reflectionInput = document.getElementById("reflection-input");
const releaseButton = document.getElementById("release-button");
const emotionSelect = document.getElementById("emotion-select"); // Added dropdown element
const reflectionMessage = document.createElement("p"); // Dynamically create the message element
reflectionMessage.id = "reflection-message"; // Add an ID for consistency
document.querySelector(".reflective-textarea").appendChild(reflectionMessage); // Append to the container

releaseButton.addEventListener("click", () => {
  const input = reflectionInput.value.trim();
  const selectedEmotion = emotionSelect.value; // Get the selected emotion
  if (input) {
    reflectionInput.value = "";
    reflectionMessage.textContent = `You were feeling ${selectedEmotion}, and your thoughts have been released. Let them flow like water.`;
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

    // Get drop coordinates adjusted for scrolling
    const x = e.pageX; // X-coordinate of the mouse relative to the document
    const y = e.pageY; // Y-coordinate of the mouse relative to the document

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

// Add event listener to all buttons with class "playButton"
document.querySelectorAll('.playButton').forEach(button => {
  button.addEventListener('click', function () {
      // Get the audio element associated with this button
      const audioId = this.getAttribute('data-sound');
      const audioElement = document.getElementById(audioId);

      // Pause all other audio elements
      document.querySelectorAll('audio').forEach(audio => {
          if (!audio.paused && audio.id !== audioId) {
              audio.pause();
              audio.currentTime = 0; // Reset to start
          }
      });

      // Play or pause the selected audio
      if (audioElement.paused) {
          audioElement.play();
      } else {
          audioElement.pause();
          audioElement.currentTime = 0; // Reset to start
      }
  });
});
 
 // Select the button and audio elements using their IDs
const playButton = document.getElementById('playButton');
const audioElement = document.getElementById('myAudio');

// Add a click event listener to the button
playButton.addEventListener('click', function() {
    // Play the audio when the button is clicked
    audioElement.play();
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".carousel-container");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const totalSlides = document.querySelectorAll(".carousel-slide").length;
  let currentIndex = 0;

  // Function to update the carousel position
  function updateCarousel() {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Event listeners for buttons
  prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
      updateCarousel();
  });

  nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
      updateCarousel();
  });
});

