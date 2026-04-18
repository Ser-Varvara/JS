let allLevels = []; // Зберігаємо всі рівні тут
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
        
        // Початкова ініціалізація
        initGame(0);
        
        // Налаштування кнопок
        document.getElementById('new-game').onclick = () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * allLevels.length);
            } while (nextIndex === currentLevelIndex && allLevels.length > 1);
            initGame(nextIndex);
        };

        document.getElementById('restart').onclick = () => initGame(currentLevelIndex);
        
        // Додай цю кнопку в HTML, якщо хочеш авто-розв'язок
        const solveBtn = document.getElementById('solve');
        if (solveBtn) solveBtn.onclick = solveGame;

    } catch (error) {
        console.error("Помилка завантаження JSON:", error);
    }
}

function initGame(index) {
    currentLevelIndex = index;
    // Копіюємо дані рівня, щоб не псувати оригінал в allLevels
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
            if (currentGrid[r][c] === 1) cell.classList.add('is-on');
            cell.onclick = () => handleCellClick(r, c);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(r, c) {
    // Якщо клікнули на ту саму клітинку — "скасовуємо" хід у лічильнику
    if (lastClicked.r === r && lastClicked.c === c) {
        steps--;
        lastClicked = { r: -1, c: -1 }; // Скидаємо, щоб третій клік знову був "новим"
    } else {
        steps++;
        lastClicked = { r, c };
    }

    // Зміна стану (хрест)
    toggleLightsAt(r, c);
    
    renderBoard();
    updateUI();
    checkWin();
}

function toggleLightsAt(r, c) {
    toggleSingleLight(r, c);       // Центр
    toggleSingleLight(r - 1, c);   // Топ
    toggleSingleLight(r + 1, c);   // Низ
    toggleSingleLight(r, c - 1);   // Ліво
    toggleSingleLight(r, c + 1);   // Право
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

// АЛГОРИТМ АВТО-РОЗВ'ЯЗАННЯ (SOLVER)
async function solveGame() {
    // Скидаємо гру для чистого розв'язку
    initGame(currentLevelIndex);
    
    // 1. "Chase the lights" (виганяємо світло вниз)
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
            if (currentGrid[r][c] === 1) {
                await performStep(r + 1, c);
            }
        }
    }

    // 2. Аналіз останнього рядка для корекції першого
    const lastRow = currentGrid[4];
    const combinations = {
        '10000': [3, 4],
        '01000': [1, 4],
        '00100': [3],
        '00010': [0, 3],
        '00001': [0, 1],
        '11000': [2],
        '00011': [2]
        // Додай інші комбінації, якщо зустрінеш специфічні випадки
    };

    let rowKey = lastRow.join('');
    if (combinations[rowKey]) {
        for (let col of combinations[rowKey]) {
            await performStep(0, col);
        }
        // Знову виганяємо світло вниз
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 5; c++) {
                if (currentGrid[r][c] === 1) {
                    await performStep(r + 1, c);
                }
            }
        }
    }
}

function performStep(r, c) {
    return new Promise(res => {
        setTimeout(() => {
            handleCellClick(r, c);
            res();
        }, 300); // Швидкість "робота"
    });
}

document.addEventListener('DOMContentLoaded', loadLevels);
