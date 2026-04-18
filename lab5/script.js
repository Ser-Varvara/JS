const startBtn = document.querySelector('#startBtn');
const gameArea = document.querySelector('#gameArea');
const scoreDisplay = document.querySelector('#scoreDisplay');
const difficultySelect = document.querySelector('#difficulty');
const colorSelect = document.querySelector('#color');

let score = 0;
let gameTimer;
let target;

function spawnTarget() {
    // Видаляємо стару фігуру, якщо вона була
    if (target) target.remove();

    // Створюємо новий елемент (вузол DOM)
    target = document.createElement('div');
    target.className = 'target';
    
    // Налаштування складності
    const difficulty = difficultySelect.value;
    let size, time;

    if (difficulty === 'easy') { size = 80; time = 2000; }
    else if (difficulty === 'medium') { size = 50; time = 1200; }
    else { size = 25; time = 700; }

    // Встановлюємо стиль та колір
    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.backgroundColor = colorSelect.value;

    // Випадкова позиція
    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    target.style.left = Math.random() * maxX + 'px';
    target.style.top = Math.random() * maxY + 'px';

    // Обробник кліку на фігуру
    target.addEventListener('click', (e) => {
        e.stopPropagation(); // Щоб клік не йшов на поле
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        clearTimeout(gameTimer); // Скасовуємо таймер зникнення
        spawnTarget(); // Створюємо нову ціль миттєво
    });

    gameArea.appendChild(target);

    // Таймер зникнення (якщо не встиг клікнути)
    gameTimer = setTimeout(() => {
        spawnTarget();
    }, time);
}

startBtn.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    startBtn.disabled = true; // Вимикаємо кнопку під час гри
    spawnTarget();
});
