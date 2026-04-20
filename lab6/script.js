let currentLevelData = null;
let currentGrid = [];
let steps = 0;
let timer = 0;
let timerInterval = null;
let currentLevelIndex = -1;
let lastClicked = { r: -1, c: -1 };

const boardElement = document.getElementById('game-board');
const stepsElement = document.getElementById('steps');
const timerElement = document.getElementById('timer');
const minStepsElement = document.getElementById('min-steps');

async function loadLevels() {
    try {
        const response = await fetch('./data/levels.json');
        const data = await response.json();
        initGame(data.levels, 0);
        
        document.getElementById('new-game').onclick = () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * data.levels.length);
            } while (nextIndex === currentLevelIndex);
            initGame(data.levels, nextIndex);
        };

        document.getElementById('restart').onclick = () => {
            initGame(data.levels, currentLevelIndex);
        };

    } catch (error) {
        console.error("Помилка завантаження JSON:", error);
    }
}

function initGame(levels, index) {
    currentLevelIndex = index;
    currentLevelData = JSON.parse(JSON.stringify(levels[index])); 
    currentGrid = currentLevelData.grid;
    
    steps = 0;
    timer = 0;
    lastClicked = { r: -1, c: -1 };
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);

    minStepsElement.textContent = currentLevelData.minSteps;
    renderBoard();
    updateUI();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (currentGrid[r][c] === 1) cell.classList.add('is-on');
            cell.onclick = () => handleCellClick(r, c);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(r, c) {
    if (lastClicked.r === r && lastClicked.c === c) {
        steps--;
        lastClicked = { r: -1, c: -1 };
    } else {
        steps++;
        lastClicked = { r, c };
    }

    toggleLight(r, c);       // Центр
    toggleLight(r - 1, c);   // Топ
    toggleLight(r + 1, c);   // Низ
    toggleLight(r, c - 1);   // Ліво
    toggleLight(r, c + 1);   // Право

    renderBoard();
    updateUI();
    checkWin();
}

function toggleLight(r, c) {
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        currentGrid[r][c] = currentGrid[r][c] === 1 ? 0 : 1;
    }
}

function updateUI() {
    stepsElement.textContent = steps;
}

function checkWin() {
    const isWin = currentGrid.every(row => row.every(cell => cell === 0));
    if (isWin) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`Перемога! Витрачено часу: ${timer} сек. Кроків: ${steps}`);
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', loadLevels);
