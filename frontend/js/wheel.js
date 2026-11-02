"use strict";

// Define wheel prize segments
let wheelSegments = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, "BANKRUPT", "LOSE A TURN"];
let currentRotation = 0;

// Function to generate text labels inside the wheel slices
function initWheelSegments() {
    let wheel = document.getElementById("wheel");
    if (!wheel) return;

    let totalSegments = wheelSegments.length;
    let angleStep = 360 / totalSegments;

    let center = document.getElementById("wheelCenter");
    wheel.innerHTML = "";
    if (center) wheel.appendChild(center);

    wheelSegments.forEach((segment, index) => {
        let slice = document.createElement("div");
        slice.className = "wheel-slice";
        
        // Align to the middle of each 30-degree conic segment
        let rotationAngle = (index * angleStep) + (angleStep / 2);
        slice.style.transform = `rotate(${rotationAngle}deg)`;

        let textSpan = document.createElement("span");
        textSpan.className = "slice-text";
        
        if (segment === "BANKRUPT" || segment === "LOSE A TURN") {
            textSpan.textContent = segment;
            textSpan.style.fontSize = "0.5rem";
        } else {
            textSpan.textContent = "$" + segment;
        }

        slice.appendChild(textSpan);
        wheel.appendChild(slice);
    });
}

// Handle the Spin button click
function btnSpin_onclick() {
    if (typeof gameOver !== 'undefined' && gameOver) {
        alert("This puzzle has already been solved.");
        return;
    }

    let wheel = document.getElementById("wheel");
    let spinButton = document.getElementById("btnSpin");
    
    // Disable spin button during animation
    if (spinButton) spinButton.disabled = true;

    // Add multiple full turns (360 * 5 = 1800) + random extra angle
    let extraDegree = Math.floor(Math.random() * 360) + 1800;
    currentRotation += extraDegree;
    
    if (wheel) {
        wheel.style.transform = `rotate(${currentRotation}deg)`;
    }

    // Determine prize after the 3-second spin animation completes
    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * wheelSegments.length);
        let prize = wheelSegments[randomIndex];

        let messageElement = document.getElementById("message");
        let wheelResult = document.getElementById("wheelResult");

        if (prize === "BANKRUPT") {
            if (typeof player !== 'undefined') {
                player.resetRoundEarnings();
                UpdateMoneyDisplay();
            }
            wheelResult.textContent = "Spin result: BANKRUPT!";
            messageElement.textContent = "Ouch! Bankrupt. Round earnings lost.";
        } 
        else if (prize === "LOSE A TURN") {
            wheelResult.textContent = "Spin result: LOSE A TURN!";
            messageElement.textContent = "Bad luck! You lose your turn.";
        } 
        else {
            wheelResult.textContent = "Spin result: $" + prize;
            messageElement.textContent = "You spun $" + prize + "! Now guess a consonant.";
            window.currentSpinValue = prize;
        }

        // Re-enable spin button
        if (spinButton) spinButton.disabled = false;
    }, 3000);
}

// Initialize wheel values when the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    initWheelSegments();
});