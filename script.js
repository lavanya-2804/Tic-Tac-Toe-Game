let currentPlayer = 'X'; // Player X starts the game
let player1Name = '';
let player2Name = '';
let player1Wins = 0;
let player2Wins = 0;
let totalGamesPlayed = 0;

const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const scoreboard = document.getElementById('scoreboard');
const gamesPlayedDisplay = document.getElementById('games-played');

// Function to switch players
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer === 'X' ? player1Name : player2Name}`;
}

// Function to handle cell click
function cellClickHandler(event) {
    const clickedCell = event.target;
    if (clickedCell.textContent === '') {
        clickedCell.textContent = currentPlayer;
        if (checkWin()) {
            handleWin(currentPlayer);
        } else if (checkDraw()) {
            alert("It's a draw!");
            resetGame();
        } else {
            switchPlayer();
        }
    }
}

// Function to check for a win
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            return true;
        }
    }
    return false;
}

// Function to check for a draw
function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

// Function to handle win
function handleWin(winner) {
    if (winner === 'X') {
        player1Wins++;
    } else {
        player2Wins++;
    }
    alert(`Player ${winner} wins!`);
    updateScoreboard();
    resetGame();
}

// Function to reset the game
function resetGame() {
    console.log("Resetting game..."); // Log message to verify function execution
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = `Current Player: ${player1Name}`;
}

// Function to start the game
function startGame() {
    player1Name = prompt("Enter Player 1's name:");
    player2Name = prompt("Enter Player 2's name:");
    currentPlayerDisplay.textContent = `Current Player: ${player1Name}`;
    updateScoreboard();
}

// Function to update the scoreboard
function updateScoreboard() {
    scoreboard.textContent = `${player1Name}: ${player1Wins} | ${player2Name}: ${player2Wins}`;
    totalGamesPlayed++;
    gamesPlayedDisplay.textContent = `Total Games Played: ${totalGamesPlayed}`;
}

// Event listener for cell clicks
cells.forEach(cell => cell.addEventListener('click', cellClickHandler));

// Start the game
startGame();
