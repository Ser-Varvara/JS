const startBtn = document.querySelector('#startBtn');
const gameArea = document.querySelector('#gameArea');
const scoreDisplay = document.querySelector('#scoreDisplay');
const difficultySelect = document.querySelector('#difficulty');
const colorSelect = document.querySelector('#color');

let score = 0;
let gameTimer = null;
let target = null;
let isPlaying = false;

function gameOver() {
    isPlaying = false;
    if (target) target.remove();
    clearTimeout(gameTimer);
    
    // Картка програшу згідно з фото
    alert(`Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`);
    
    startBtn.disabled = false;
}

function spawnTarget() {
    if (!isPlaying) return;

    if (target) target.remove();
    clearTimeout(gameTimer);

    target = document.createElement('div');
    target.className = 'target';
    
    const difficulty = difficultySelect.value;
    let size, time;

    if (difficulty === 'easy') { size = 80; time = 3000; }
    else if (difficulty === 'medium') { size = 60; time = 2000; }
    else if (difficulty === 'hard') { size = 40; time = 1000; }
    else { size = 20; time = 500; }

    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.backgroundColor = colorSelect.value;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    target.style.left = Math.random() * maxX + 'px';
    target.style.top = Math.random() * maxY + 'px';

    target.onclick = function(e) {
        e.stopPropagation();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        spawnTarget(); 
    };

    gameArea.appendChild(target);

    gameTimer = setTimeout(() => {
        if (isPlaying) gameOver();
    }, time);
}

startBtn.onclick = function() {
    // ПЕРЕВІРКА: чи обрано складність та колір
    if (difficultySelect.value === "" || colorSelect.value === "") {
        alert("Please choose both difficulty and color before starting!");
        return; // Перериваємо функцію, гра не почнеться
    }

    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    isPlaying = true;
    startBtn.disabled = true;
    spawnTarget();
};
