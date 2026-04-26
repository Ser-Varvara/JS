document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");
    const catalogBtn = document.getElementById("load-catalog");

    // Функція для завантаження категорій
    function loadCategories() {
        fetch('data/categories.json')
            .then(response => response.json())
            .then(categories => {
                let html = "<h2>Каталог товарів</h2><div class='categories-list'>";
                categories.forEach(cat => {
                    html += `<div class="category-item">
                        <a href="#" onclick="loadItems('${cat.shortname}')">${cat.name}</a>
                        <p>${cat.notes}</p>
                    </div>`;
                });
                // Додаємо посилання Specials
                const randomCat = categories[Math.floor(Math.random() * categories.length)].shortname;
                html += `<div class="category-item">
                    <a href="#" onclick="loadItems('${randomCat}')">Specials</a>
                </div></div>`;
                
                mainContent.innerHTML = html;
            });
    }

    // Функція для завантаження товарів конкретної категорії
    window.loadItems = function (shortname) {
        fetch(`data/${shortname}.json`)
            .then(response => response.json())
            .then(data => {
                let html = `<h2>Категорія: ${data.categoryName}</h2><div class='items-grid'>`;
                data.items.forEach(item => {
                    html += `
                        <div class="product-card">
                            <img src="https://placehold.co/200x200?text=${item.name}" alt="${item.name}">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <p><strong>Ціна: ${item.price}</strong></p>
                        </div>`;
                });
                html += "</div>";
                mainContent.innerHTML = html;
            });
    };

    catalogBtn.addEventListener("click", function (e) {
        e.preventDefault();
        loadCategories();
    });
});
