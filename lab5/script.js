const startBtn = document.querySelector('#startBtn');
const gameArea = document.querySelector('#gameArea');
const scoreDisplay = document.querySelector('#scoreDisplay');
const difficultySelect = document.querySelector('#difficulty');
const colorSelect = document.querySelector('#color');

let score = 0;
let gameTimer; // Ідентифікатор таймера
let target;

function gameOver() {
    // Видаляємо фігуру та зупиняємо таймер
    if (target) target.remove();
    clearTimeout(gameTimer);

    // Виводимо повідомлення як на фото
    alert(`Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`);
    
    // Робимо кнопку знову активною для нової гри
    startBtn.disabled = false;
}

function spawnTarget() {
    // Очищуємо попередню фігуру, якщо вона була
    if (target) target.remove();

    target = document.createElement('div');
    target.className = 'target';
    
    const difficulty = difficultySelect.value;
    let size, time;

    // Налаштування згідно з твоїми умовами
    if (difficulty === 'easy') { size = 80; time = 3000; }
    else if (difficulty === 'medium') { size = 60; time = 2000; }
    else if (difficulty === 'hard') { size = 40; time = 1000; }
    else if (difficulty === 'impossible') { size = 20; time = 500; }

    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.backgroundColor = colorSelect.value;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    target.style.left = Math.random() * maxX + 'px';
    target.style.top = Math.random() * maxY + 'px';

    // ОБРОБКА КЛІКУ
    target.addEventListener('click', (e) => {
        e.stopPropagation();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // ВАЖЛИВО: Скасовуємо таймер програшу, бо користувач встиг клікнути!
        clearTimeout(gameTimer); 
        
        // Створюємо нову фігуру
        spawnTarget(); 
    });

    gameArea.appendChild(target);

    // ТАЙМЕР ПРОГРАШУ
    // Якщо цей код спрацює через 'time' мілісекунд — викликається gameOver
    gameTimer = setTimeout(() => {
        gameOver();
    }, time);
}

startBtn.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    startBtn.disabled = true; // Блокуємо кнопку, поки триває гра
    spawnTarget();
});
