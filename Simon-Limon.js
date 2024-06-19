/**
 * ICS3UC - Mr. Brash 🐿️
 *  
 * Rich Summative Task
 * 
 * Author: Alex Garcia-Salas 
 */

'use strict';
//setting up variables
document.addEventListener("DOMContentLoaded", function(){ //Ensures that code runs only after HTML file is loaded.
  let sequence = [];
  let userSequence = [];
  let currentStep = 0;
  let gameStarted = false;
  let level = 1;
  let currentLevel = 1;
  let round = 1;

  // Function to generate a random color
  function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Function to display the sequence to GUI.
  function displaySequence() {
    document.getElementById("sequence-display").innerHTML = "";
    for (let i = 0; i < sequence.length; i++) {
      const colorButton = document.getElementById(`${sequence[i]}-button`);
      colorButton.style.opacity = 0.5;
      setTimeout(() => {
        colorButton.style.opacity = 1;
      }, 500);
      document.getElementById("sequence-display").innerHTML += `<span style="color: ${sequence[i]}">${sequence[i]}</span> `;
    }
  }

  // Function to handle user input. Meaning sequence enter order 
  
  function handleUserInput(color) {
    userSequence.push(color.toLowerCase());
    if (userSequence.length === sequence.length) {
      if (userSequence.every((c, i) => c === sequence[i])) {
        alert("Correct! Next sequence:");
        round++;
        if (round <= 5) {
          generateSequence();
        } else {
          level++;
          round = 1;
          if (level <= 5) {
            generateSequence();
          } else {
            alert("Congratulations! You have completed all 5 levels!");
            resetGame(); // This line resets game.
            document.getElementById("start-button").style.display = "block"; // Show the start button again
          }
        }
      } else {
        alert("Incorrect. Try again.");
        userSequence = []; // Reset userSequence array
        document.getElementById("start-button").style.display = "block"; // Show the start button again
      }
    }
  }
  // Function to generate a new sequence
  function generateSequence() {
    sequence = [];
    userSequence = []; // Reset userSequence array
    for (let i = 0; i < round + 4; i++) {
      sequence.push(getRandomColor());
    }
    displaySequence();
    gameStarted = true;
  }

  // Event listeners
  document.getElementById("start-button").addEventListener("click", () => {
    gameStarted = true;
    generateSequence();
  });
// This is used to add click event listeners to all elements with the class color-button in the HTML document. 
  const colorButtons = document.querySelectorAll(".color-button");
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (gameStarted) {
        const color = button.id.replace('-button', '').toLowerCase();
        handleUserInput(color);
      }
    });
  });

  

  // Function to reset the game
  function resetGame() {
    gameStarted = false;
    level = 1;
    currentLevel = 1;
    sequence = [];
    userSequence = [];
    document.getElementById("level").textContent = `Level ${level}`;
  }
  // Function to go to the next round
  function nextRound() {
    level++;
    currentLevel++;
    setTimeout(() => {
      generateSequence();
    }, 1000);
  }

  // Initiate the game
  document.getElementById("start-button").addEventListener("click", () => {
    gameStarted = true;
    level = 1;
    round = 1;
    generateSequence();
 } )})
