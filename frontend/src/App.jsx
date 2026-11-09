import { useState } from 'react';

const puzzles = [
  { category: 'THING', answer: 'COMPUTER MOUSE' },
  { category: 'FOOD', answer: 'CHOCOLATE CAKE' },
  { category: 'PLACE', answer: 'PHILADELPHIA' },
  { category: 'ANIMAL', answer: 'GOLDEN RETRIEVER' },
  { category: 'THING', answer: 'VIDEO GAME' },
  { category: 'PHRASE', answer: 'LIVE LAUGH LOVE' },
];

const wheelSegments = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 'BANKRUPT', 'LOSE A TURN'];
const vowels = 'AEIOU';

function App() {
  const [puzzle, setPuzzle] = useState(() => puzzles[Math.floor(Math.random() * puzzles.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [roundEarnings, setRoundEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [message, setMessage] = useState('Guess a consonant or solve the puzzle.');
  const [letterGuess, setLetterGuess] = useState('');
  const [vowelGuess, setVowelGuess] = useState('');
  const [solveGuess, setSolveGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinValue, setSpinValue] = useState(0);
  const [wheelResult, setWheelResult] = useState('Spin that wheel!');

  const finishPuzzle = (bankAmount = roundEarnings) => {
    if (gameOver) return;
    setGameOver(true);
    setTotalEarnings((total) => total + bankAmount);
    setRoundEarnings(0);
    setMessage(`Congratulations! You solved the puzzle and banked $${bankAmount}!`);
  };

  const startNewPuzzle = () => {
    let nextPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    if (puzzles.length > 1 && nextPuzzle === puzzle) {
      nextPuzzle = puzzles[(puzzles.indexOf(nextPuzzle) + 1) % puzzles.length];
    }
    setPuzzle(nextPuzzle);
    setGuessedLetters([]);
    setRoundEarnings(0);
    setGameOver(false);
    setSpinValue(0);
    setMessage('Guess a consonant or solve the puzzle.');
    setLetterGuess('');
    setVowelGuess('');
    setSolveGuess('');
    setWheelResult('Spin that wheel!');
  };

  const checkBoard = (letters, bankAmount = roundEarnings) => {
    const allRevealed = [...puzzle.answer].every((character) => character === ' ' || letters.includes(character));
    if (allRevealed) finishPuzzle(bankAmount);
  };

  const guessLetter = () => {
    if (gameOver) return window.alert('This puzzle has already been solved.');
    const letter = letterGuess.trim().toUpperCase();
    if (!/^[A-Z]$/.test(letter)) return window.alert('Please enter one letter from A to Z.');
    if (vowels.includes(letter)) return window.alert('Please enter a consonant.');
    if (guessedLetters.includes(letter)) return window.alert('You already guessed that letter.');

    const nextGuesses = [...guessedLetters, letter];
    const occurrences = [...puzzle.answer].filter((character) => character === letter).length;
    setGuessedLetters(nextGuesses);
    setLetterGuess('');
    if (occurrences) {
      const winnings = occurrences * (spinValue || 500);
      const updatedRoundEarnings = roundEarnings + winnings;
      setRoundEarnings((amount) => amount + winnings);
      setMessage(`Correct! The letter ${letter} appears ${occurrences} time(s). You earned $${winnings}.`);
      setSpinValue(0);
      checkBoard(nextGuesses, updatedRoundEarnings);
    } else {
      setMessage(`Sorry, ${letter} is not in the puzzle.`);
      setSpinValue(0);
      checkBoard(nextGuesses);
    }
  };

  const buyVowel = () => {
    if (gameOver) return window.alert('This puzzle has already been solved.');
    if (roundEarnings < 250) return window.alert('You need at least $250 in round earnings to buy a vowel.');
    const vowel = vowelGuess.trim().toUpperCase();
    if (!/^[A-Z]$/.test(vowel)) return window.alert('Please enter one letter from A to Z.');
    if (!vowels.includes(vowel)) return window.alert('Please enter a vowel (A, E, I, O, U).');
    if (guessedLetters.includes(vowel)) return window.alert('That vowel has already been guessed.');

    const nextGuesses = [...guessedLetters, vowel];
    const occurrences = [...puzzle.answer].filter((character) => character === vowel).length;
    const updatedRoundEarnings = roundEarnings - 250;
    setGuessedLetters(nextGuesses);
    setRoundEarnings((amount) => amount - 250);
    setVowelGuess('');
    setMessage(occurrences
      ? `Good buy! The vowel ${vowel} appears ${occurrences} time(s). ($250 deducted)`
      : `Sorry, ${vowel} is not in the puzzle. ($250 deducted)`);
    checkBoard(nextGuesses, updatedRoundEarnings);
  };

  const solvePuzzle = () => {
    if (gameOver) return window.alert('This puzzle has already been solved.');
    const answer = solveGuess.trim().toUpperCase();
    if (!answer) return window.alert('Please enter your answer.');
    if (answer === puzzle.answer) finishPuzzle();
    else {
      setMessage('Incorrect! Try again.');
      setSolveGuess('');
    }
  };

  const spinWheel = () => {
    if (gameOver || isSpinning) return;
    const winningIndex = Math.floor(Math.random() * wheelSegments.length);
    const visualIndex = (winningIndex + 3) % wheelSegments.length;
    const segmentAngle = 360 / wheelSegments.length;
    const targetAngle = (360 - (visualIndex * segmentAngle + segmentAngle / 2)) % 360;
    const currentAngle = ((rotation % 360) + 360) % 360;
    const difference = (targetAngle - currentAngle + 360) % 360 || 360;
    setRotation(rotation + 1800 + difference);
    setIsSpinning(true);
    setWheelResult('Spinning...');

    window.setTimeout(() => {
      const prize = wheelSegments[winningIndex];
      setIsSpinning(false);
      if (prize === 'BANKRUPT') {
        setRoundEarnings(0);
        setSpinValue(0);
        setWheelResult('Spin result: BANKRUPT!');
        setMessage('Ouch! Bankrupt. Round earnings lost. Turn over.');
      } else if (prize === 'LOSE A TURN') {
        setSpinValue(0);
        setWheelResult('Spin result: LOSE A TURN!');
        setMessage('Bad luck! You lose your turn.');
      } else {
        setSpinValue(prize);
        setWheelResult(`Spin result: $${prize}`);
        setMessage(`You spun $${prize}! Now guess a consonant.`);
      }
    }, 3000);
  };

  const handleEnter = (event, action) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      action();
    }
  };

  return (
    <>
      <h1>Wheel of Fortune</h1>
      <main id="content">
        <section id="gameArea">
          <section id="boardSection" aria-label="Puzzle board">
            <div id="board">
              {puzzle.answer.split(' ').map((word, wordIndex) => (
                <div className="wordRow" key={`${word}-${wordIndex}`}>
                  {[...word].map((letter, index) => (
                    <div className={`letterBox${guessedLetters.includes(letter) || gameOver ? ' revealed' : ''}`} key={`${letter}-${index}`}>
                      {guessedLetters.includes(letter) || gameOver ? letter : ''}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div id="category">{puzzle.category}</div>
            <div id="message" role="status" aria-live="polite">{message}</div>
          </section>

          <section id="wheelSection" aria-label="Prize wheel">
            <h2>Wheel</h2>
            <div id="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
              {wheelSegments.map((segment, index) => (
                <div className="wheel-slice" key={segment} style={{ transform: `rotate(${index * 30 + 15}deg)` }}>
                  <span className="slice-text">{typeof segment === 'number' ? `$${segment}` : segment}</span>
                </div>
              ))}
              <div id="wheelCenter" />
            </div>
            <p id="wheelResult" aria-live="polite">{wheelResult}</p>
            <button type="button" id="btnSpin" onClick={spinWheel} disabled={isSpinning || gameOver}>
              {isSpinning ? 'Spinning...' : 'Spin'}
            </button>
          </section>
        </section>

        <section id="guessSection">
          <h2>Guess a Letter</h2>
          <div className="guessRow">
            <label htmlFor="letterGuess">Enter a letter:</label>
            <input id="letterGuess" type="text" maxLength="1" value={letterGuess} onChange={(event) => setLetterGuess(event.target.value)} onKeyDown={(event) => handleEnter(event, guessLetter)} />
            <button type="button" onClick={guessLetter}>Guess Letter</button>
          </div>
          <div className="guessRow">
            <label htmlFor="vowelGuess">Buy a vowel ($250):</label>
            <input id="vowelGuess" type="text" maxLength="1" value={vowelGuess} onChange={(event) => setVowelGuess(event.target.value)} onKeyDown={(event) => handleEnter(event, buyVowel)} />
            <button type="button" onClick={buyVowel}>Buy Vowel</button>
          </div>
          <div className="guessRow">
            <label htmlFor="solveGuess">If ready to solve:</label>
            <input id="solveGuess" type="text" value={solveGuess} onChange={(event) => setSolveGuess(event.target.value)} onKeyDown={(event) => handleEnter(event, solvePuzzle)} />
            <button type="button" onClick={solvePuzzle}>Solve</button>
          </div>
          <div className="guessRow buttonRow">
            <button type="button" id="btnNewGame" onClick={startNewPuzzle}>New Puzzle</button>
          </div>
        </section>

        <section id="playersSection" aria-label="Player scores">
          {[1, 2, 3].map((playerNumber) => (
            <section className="playerBox" id={`player${playerNumber}`} key={playerNumber}>
              <h2>Player {playerNumber}</h2>
              <label htmlFor={`roundMoney${playerNumber}`}>Round Money:</label>
              <input id={`roundMoney${playerNumber}`} type="text" value={playerNumber === 1 ? roundEarnings : 0} disabled readOnly />
              <br />
              <label htmlFor={`totalMoney${playerNumber}`}>Total Money:</label>
              <input id={`totalMoney${playerNumber}`} type="text" value={playerNumber === 1 ? totalEarnings : 0} disabled readOnly />
            </section>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
