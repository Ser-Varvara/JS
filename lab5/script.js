const startBtn = document.querySelector('#startBtn');
const gameArea = document.querySelector('#gameArea');
const scoreDisplay = document.querySelector('#scoreDisplay');
const difficultySelect = document.querySelector('#difficulty');
const colorSelect = document.querySelector('#color');

let score = 0;
let gameTimer;
let target;
let isGameActive = false;

function gameOver() {
    isGameActive = false;
    if (target) target.remove();
    clearTimeout(gameTimer);
    
    // Виведення повідомлення як на фото
    alert(`Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`);
    
    startBtn.disabled = false; // Дозволяємо почати знову без перезавантаження, або можна лишити disabled
}

function spawnTarget() {
    if (!isGameActive) return;

    if (target) target.remove();

    target = document.createElement('div');
    target.className = 'target';
    
    const difficulty = difficultySelect.value;
    let size, time;

    // Налаштування 4-х рівнів згідно з твоїм запитом
    if (difficulty === 'easy') { size = 80; time = 3000; }
    else if (difficulty === 'medium') { size = 60; time = 2000; }
    else if (difficulty === 'hard') { size = 40; time = 1000; }
    else { size = 20; time = 700; } // Impossible

    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.backgroundColor = colorSelect.value;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    target.style.left = Math.random() * maxX + 'px';
    target.style.top = Math.random() * maxY + 'px';

    target.addEventListener('click', (e) => {
        e.stopPropagation();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        clearTimeout(gameTimer); // Скидаємо таймер при успішному кліку
        spawnTarget(); // Створюємо нову ціль
    });

    gameArea.appendChild(target);

    // Якщо користувач не встигає за 'time' — гра закінчується
    gameTimer = setTimeout(() => {
        gameOver();
    }, time);
}

startBtn.addEventListener('click', () => {
    score = 0;
    isGameActive = true;
    scoreDisplay.textContent = `Score: ${score}`;
    startBtn.disabled = true;
    spawnTarget();
});
