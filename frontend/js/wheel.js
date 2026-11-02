"use strict";

let wheelSegments = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, "BANKRUPT", "LOSE A TURN"];
let currentRotation = 0;

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

function btnSpin_onclick() {
    if (typeof gameOver !== 'undefined' && gameOver) {
        alert("This puzzle has already been solved.");
        return;
    }

    let wheel = document.getElementById("wheel");
    let spinButton = document.getElementById("btnSpin");
    if (spinButton) spinButton.disabled = true;

    let totalSegments = wheelSegments.length;
    let degPerSegment = 360 / totalSegments; // 30 degrees per slice

    // 1. Pick a random winning index
    let winningIndex = Math.floor(Math.random() * totalSegments);

    // 2. Calculate exact center angle of this slice
    let sliceCenter = (winningIndex * degPerSegment) + (degPerSegment / 2);

    // 3. Calculate smooth forward rotation to land this exact center at the top pointer (0°)
    let targetDeg = (360 - sliceCenter) % 360;
    let currentDeg = currentRotation % 360;
    let diff = targetDeg - currentDeg;
    if (diff <= 0) diff += 360;

    let extraSpins = 360 * 5; // 5 full rotations
    currentRotation += extraSpins + diff;

    if (wheel) {
        wheel.style.transform = `rotate(${currentRotation}deg)`;
    }

    // 4. Award the exact prize matching the winning index after the 3-second animation
    setTimeout(() => {
        let prize = wheelSegments[winningIndex];
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

        if (spinButton) spinButton.disabled = false;
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    initWheelSegments();
});