
// Reset current player's round bank balance
function handleBankrupt() {
    if (typeof currentPlayer !== 'undefined') {
        currentPlayer.roundScore = 0; // or currentPlayer.resetRoundEarnings()
    }
}

// Pass control to the next player in the rotation
function nextTurn() {
    // Increment active player index
    if (typeof playerIndices !== 'undefined' && playerIndices.length > 0) {
        activePlayerIndex = (activePlayerIndex + 1) % playerIndices.length;
    }
    
    // Reset spin state for the new turn
    window.currentSpinValue = 0;

    let messageElement = document.getElementById("message");
    if (messageElement) {
        messageElement.textContent = `Player ${activePlayerIndex + 1}'s turn! Spin the wheel or buy a vowel.`;
    }

    if (typeof UpdateMoneyDisplay === 'function') {
        UpdateMoneyDisplay();
    }
}