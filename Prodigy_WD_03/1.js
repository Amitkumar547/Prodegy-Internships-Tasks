const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.getElementById('restartButton');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
let isXTurn = true;
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    if (cell.textContent === '' && gameActive) {
        cell.textContent = currentClass;
        cell.classList.add('neon');
        clickSound.play();
        if (checkWin(currentClass)) {
            gameStatus.textContent = `${currentClass} Wins!`;
            winSound.play();
            gameActive = false;
        } else if (isDraw()) {
            gameStatus.textContent = 'Draw!';
            gameActive = false;
        } else {
            isXTurn = !isXTurn;
        }
    }
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        if (combination.every(index => cells[index].textContent === currentClass)) {
            combination.forEach(index => cells[index].classList.add('winning-cell', 'pulsate'));
            return true;
        }
        return false;
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
};

const restartGame = () => {
    isXTurn = true;
    gameActive = true;
    gameStatus.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('neon', 'fade-in', 'winning-cell', 'pulsate');
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);