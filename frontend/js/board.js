
"use strict";

// User Stories:
// 2. Choose a puzzle and display its blank board.
// 7. Guess a consonant and display the results and money.
// 11. Check whether the player's solution is correct.

// List of puzzle phrases
let puzzles = [
    { category: "THING", answer: "COMPUTER MOUSE" },
    { category: "FOOD", answer: "CHOCOLATE CAKE" },
    { category: "PLACE", answer: "PHILADELPHIA" },
    { category: "ANIMAL", answer: "GOLDEN RETRIEVER" },
    { category: "THING", answer: "VIDEO GAME" },
    { category: "PHRASE", answer: "LIVE LAUGH LOVE" }
];

// Current puzzle information
let currentPuzzle;
let guessedLetters = [];
let gameOver = false;

// Temporary object from Player.java to complete 7
// NOT yet connected to the Java backend
let player = {
    roundEarnings: 0,
    totalEarnings: 0,

    // Add money earned from correct consonant guesses
    updateRoundEarnings: function (amount) {
        if (amount < 0) {
            throw new Error("Earnings can't be negative.");
        }

        this.roundEarnings += amount;
    },

    // Reset round earnings
    resetRoundEarnings: function () {
        this.roundEarnings = 0;
    },

    // Bank round earnings into total earnings
    bankRoundEarnings: function () {
        this.totalEarnings += this.roundEarnings;
        this.resetRoundEarnings();
    }
};

// Display the player's current money
function UpdateMoneyDisplay() {
    document.getElementById("roundMoney").value =
        player.roundEarnings;

    document.getElementById("totalMoney").value =
        player.totalEarnings;
}

// User Story 2
// Randomly choose a puzzle
function ChoosePuzzle() {
    let puzzleNumber;

    puzzleNumber = Math.floor(Math.random() * puzzles.length);
    currentPuzzle = puzzles[puzzleNumber];

    // Reset information for the new puzzle
    guessedLetters = [];
    player.resetRoundEarnings();
    gameOver = false;

    UpdateMoneyDisplay();

    document.getElementById("category").textContent =
        currentPuzzle.category;

    document.getElementById("letterGuess").value = "";
    document.getElementById("solveGuess").value = "";

    document.getElementById("message").textContent =
        "Guess a consonant or solve the puzzle.";

    // Display the blank puzzle board
    DisplayBoard();
}

// Display the puzzle using separate rows for each word
function DisplayBoard() {
    let board = document.getElementById("board");
    let words = currentPuzzle.answer.split(" ");
    let i;
    let j;

    // Clear the previous board
    board.innerHTML = "";

    // Create one row for each word
    for (i = 0; i < words.length; i++) {
        let wordRow = document.createElement("div");
        wordRow.className = "wordRow";

        // Create one box for each letter
        for (j = 0; j < words[i].length; j++) {
            let letterBox = document.createElement("div");
            let letter = words[i].charAt(j);

            letterBox.className = "letterBox";
            letterBox.dataset.letter = letter;

            // Reveal letters that have already been guessed
            if (guessedLetters.includes(letter) || gameOver) {
                letterBox.textContent = letter;
            }

            wordRow.appendChild(letterBox);
        }

        board.appendChild(wordRow);
    }
}

// Temporarily highlight correctly guessed letters
function revealMatchedLetters(letter) {
    let matches = document.querySelectorAll(
        ".letterBox[data-letter='" + letter + "']"
    );
    let i;

    for (i = 0; i < matches.length; i++) {
        matches[i].classList.add("highlight");
        matches[i].textContent = "";
    }

    setTimeout(function () {
        for (i = 0; i < matches.length; i++) {
            matches[i].textContent = letter;
            matches[i].classList.remove("highlight");
        }
    }, 350);
}

// User Story 7
// Allow the player to guess a consonant
function btnGuess_onclick() {
    let letter;
    let i;
    let occurrences = 0;
    let earnings;

    if (gameOver) {
        alert("This puzzle has already been solved.");
        return;
    }

    letter = document.getElementById("letterGuess").value;
    letter = letter.toUpperCase();

    // Check that the player entered one letter
    if (letter.length !== 1 || letter < "A" || letter > "Z") {
        alert("Please enter one letter from A to Z.");
        return;
    }

    // Check that the letter is a consonant and not a vowel
    if ("AEIOU".includes(letter)) {
        alert("Please enter a consonant.");
        return;
    }

    // Prevent duplicate guesses
    if (guessedLetters.includes(letter)) {
        alert("You already guessed that letter.");
        return;
    }

    guessedLetters.push(letter);

    // Count how many times the letter appears
    for (i = 0; i < currentPuzzle.answer.length; i++) {
        if (currentPuzzle.answer.charAt(i) === letter) {
            occurrences++;
        }
    }

    // Display the results
    if (occurrences > 0) {
        earnings = occurrences * 500;

        // Use the player's earnings method
        player.updateRoundEarnings(earnings);

        UpdateMoneyDisplay();

        document.getElementById("message").textContent =
            "Correct! The letter " + letter + " appears " +
            occurrences + " time(s). You earned $" +
            earnings + ".";

        revealMatchedLetters(letter);
    }
    else {
        document.getElementById("message").textContent =
            "Sorry, " + letter + " is not in the puzzle.";

        DisplayBoard();
    }

    document.getElementById("letterGuess").value = "";

    // Check whether all letters have been revealed
    CheckBoard();
}

// Check whether the entire puzzle has been revealed
function CheckBoard() {
    let i;
    let letter;
    let found = false;

    for (i = 0; i < currentPuzzle.answer.length; i++) {
        letter = currentPuzzle.answer.charAt(i);

        if (letter >= "A" && letter <= "Z") {
            if (!guessedLetters.includes(letter)) {
                found = true;
            }
        }
    }

    if (!found) {
        FinishPuzzle();
    }
}

// User Story 11
// Check whether the player's full answer is correct
function btnSolve_onclick() {
    let answerGuess;

    if (gameOver) {
        alert("This puzzle has already been solved.");
        return;
    }

    answerGuess = document.getElementById("solveGuess").value;
    answerGuess = answerGuess.trim().toUpperCase();

    if (answerGuess === "") {
        alert("Please enter your answer.");
        return;
    }

    // Check the player's answer
    if (answerGuess === currentPuzzle.answer) {
        FinishPuzzle();
    }
    else {
        document.getElementById("message").textContent =
            "Incorrect! Try again.";

        document.getElementById("solveGuess").value = "";
    }
}

// Finish the puzzle and bank the player's earnings
function FinishPuzzle() {
    let bankedAmount;

    if (gameOver) {
        return;
    }

    gameOver = true;

    // Save the amount before banking resets round earnings
    bankedAmount = player.roundEarnings;

    // Temporary frontend banking.
    // This will need to call the backend when the API is ready.
    player.bankRoundEarnings();

    // Reveal the entire board
    DisplayBoard();

    // Update both money fields
    UpdateMoneyDisplay();

    document.getElementById("message").textContent =
        "Congratulations! You solved the puzzle and banked $" +
        bankedAmount + "!";
}

// Start a new puzzle
function btnNewGame_onclick() {
    ChoosePuzzle();
}

// Choose the first puzzle when the page opens
ChoosePuzzle();
