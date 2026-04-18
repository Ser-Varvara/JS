const startBtn = document.querySelector('#startBtn');
const gameArea = document.querySelector('#gameArea');
const scoreDisplay = document.querySelector('#scoreDisplay');
const difficultySelect = document.querySelector('#difficulty');
const colorSelect = document.querySelector('#color');

let score = 0;
let gameTimer = null; // Змінна для одного активного таймера
let target = null;
let isPlaying = false; // Прапор стану гри

function gameOver() {
    isPlaying = false;
    if (target) target.remove();
    clearTimeout(gameTimer); // Зупиняємо таймер
    
    // Використовуємо alert для імітації системної картки з фото image_0b1ce1.png
    alert(`Game over! Your score is ${score}, congratulations!\nPlease, click ok to start a new game.`);
    
    startBtn.disabled = false;
}

function spawnTarget() {
    if (!isPlaying) return; // Якщо програли — нові фігури не створюються

    if (target) target.remove();
    clearTimeout(gameTimer); // Очищуємо старий таймер перед створенням нового

    target = document.createElement('div');
    target.className = 'target';
    
    const difficulty = difficultySelect.value;
    let size, time;

    // Встановлюємо параметри згідно з твоїм запитом
    if (difficulty === 'easy') { size = 80; time = 3000; }
    else if (difficulty === 'medium') { size = 60; time = 2000; }
    else if (difficulty === 'hard') { size = 40; time = 1000; }
    else { size = 20; time = 500; } // Impossible

    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.backgroundColor = colorSelect.value;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    target.style.left = Math.random() * maxX + 'px';
    target.style.top = Math.random() * maxY + 'px';

    // Обробка успішного кліку
    target.onclick = function(e) {
        e.stopPropagation();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        spawnTarget(); // Клікнули вчасно — створюємо нову
    };

    gameArea.appendChild(target);

    // ТАЙМЕР ПРОГРАШУ: якщо час вийшов, а кліку не було — GameOver
    gameTimer = setTimeout(() => {
        if (isPlaying) gameOver();
    }, time);
}

startBtn.onclick = function() {
    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    isPlaying = true;
    startBtn.disabled = true;
    spawnTarget();
};
