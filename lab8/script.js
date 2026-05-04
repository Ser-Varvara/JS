// 1. Бургер-меню
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 2. Карусель
const slide = document.getElementById('carousel-slide');
const images = document.querySelectorAll('#carousel-slide img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots-container');

let counter = 0;
const size = 100; // у відсотках

// Створення індикаторів (крапок)
images.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === counter);
    });
}

function goToSlide(index) {
    counter = index;
    slide.style.transform = `translateX(${-size * counter}%)`;
    updateDots();
}

nextBtn.addEventListener('click', () => {
    counter = (counter + 1) % images.length;
    goToSlide(counter);
});

prevBtn.addEventListener('click', () => {
    counter = (counter - 1 + images.length) % images.length;
    goToSlide(counter);
});

// Автоматична зміна слайдів
setInterval(() => {
    nextBtn.click();
}, 5000);
