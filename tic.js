let gameOn = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const statusDisplay = document.querySelector('.gameStatus');
const winGame = () => `Player ${currentPlayer} has won!`;
const tieGame = () => `Game ended in a Tie`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningChance = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
statusDisplay.innerHTML = currentPlayerTurn();



function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}
function PlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function ResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winOpp = winningChance[i];
        let a = gameState[winOpp[0]];
        let b = gameState[winOpp[1]];
        let c = gameState[winOpp[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
    
    if (a === b && b === c) {
        roundWon = true;
        break
    }
    }
    if (roundWon) {
    statusDisplay.innerHTML = winGame();
    gameOn = false;
    return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = tieGame();
        gameOn = false;
        return;
    }

    PlayerChange();

}

function CellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell'));
     
    if (gameState[clickedCellIndex] !== "" || !gameOn){
         return;
     }
     CellPlayed(clickedCell, clickedCellIndex);
     ResultValidation();
}
function RestartGame() {
    gameOn = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick));
document.querySelector('.restartGame').addEventListener('click', RestartGame);