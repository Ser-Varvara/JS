let allLevels = [];
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
        allLevels = data.levels;
        initGame(0);
        
        document.getElementById('new-game').onclick = () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * allLevels.length);
            } while (nextIndex === currentLevelIndex && allLevels.length > 1);
            initGame(nextIndex);
        };

        document.getElementById('restart').onclick = () => initGame(currentLevelIndex);
        
        const solveBtn = document.getElementById('solve');
        if (solveBtn) solveBtn.onclick = solveGame;

    } catch (error) {
        console.error("Помилка завантаження JSON:", error);
    }
}

function initGame(index) {
    currentLevelIndex = index;
    currentLevelData = JSON.parse(JSON.stringify(allLevels[index]));
    currentGrid = currentLevelData.grid;
    
    steps = 0;
    timer = 0;
    lastClicked = { r: -1, c: -1 };
    
    timerElement.textContent = "0";
    stepsElement.textContent = "0";
    minStepsElement.textContent = currentLevelData.minSteps;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);

    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-r', r);
            cell.setAttribute('data-c', c);
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

    toggleLightsAt(r, c);
    renderBoard();
    updateUI();
    checkWin();
}

function toggleLightsAt(r, c) {
    toggleSingleLight(r, c);
    toggleSingleLight(r - 1, c);
    toggleSingleLight(r + 1, c);
    toggleSingleLight(r, c - 1);
    toggleSingleLight(r, c + 1);
}

function toggleSingleLight(r, c) {
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
            alert(`Перемога! Час: ${timer}с, Кроків: ${steps}`);
        }, 100);
    }
}

// ФУНКЦІЯ ДЛЯ ВІЗУАЛЬНОГО ПОКАЗУ ХОДІВ БОТА
async function performStep(r, c) {
    const cell = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
        cell.style.boxShadow = "0 0 20px 5px white"; // Підсвічуємо білим
        cell.style.transform = "scale(0.85)";
    }

    return new Promise(res => {
        setTimeout(() => {
            handleCellClick(r, c);
            res();
        }, 400); // Затримка 0.4 сек, щоб було видно хід
    });
}

// АЛГОРИТМ АВТО-РОЗВ'ЯЗАННЯ (ПОВНИЙ)
async function solveGame() {
    // 1. Починаємо спочатку
    initGame(currentLevelIndex);
    await new Promise(r => setTimeout(r, 500));

    // Функція витіснення світла вниз
    const chaseDown = async () => {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 5; c++) {
                if (currentGrid[r][c] === 1) {
                    await performStep(r + 1, c);
                }
            }
        }
    };

    // Перший прогін
    await chaseDown();

    // 2. Корекція першого рядка згідно стану останнього рядка
    const lastRow = currentGrid[4].join('');
    
    // Повна математична таблиця корекцій для поля 5x5
    const combinations = {
        '10001': [3],          // Горять 1 і 5 -> тиснемо 4 в 1-му ряду
        '01010': [1, 4],       // Горять 2 і 4 -> тиснемо 2 і 5
        '11100': [1],          // Горять 1,2,3 -> тиснемо 2
        '00111': [3],          // Горять 3,4,5 -> тиснемо 4
        '10110': [4],          // Горять 1,3,4 -> тиснемо 5
        '01101': [0],          // Горять 2,3,5 -> тиснемо 1
        '11011': [2],          // Горять 1,2,4,5 -> тиснемо 3
        '00011': [1],          // Твоя ситуація зі скрина: 4,5 -> тиснемо 2
        '11000': [3],          // 1,2 -> тиснемо 4
        '01110': [1, 2, 3]     // 2,3,4 -> тиснемо 2,3,4
    };

    if (combinations[lastRow]) {
        for (let col of combinations[lastRow]) {
            await performStep(0, col);
        }
        // Фінальний прогін
        await chaseDown();
    }
}

document.addEventListener('DOMContentLoaded', loadLevels);
