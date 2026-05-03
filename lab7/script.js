document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");
    const catalogLink = document.getElementById("load-catalog");

    // Функція для завантаження категорій
    function loadCategories() {
        fetch('data/categories.json')
            .then(res => res.json())
            .then(categories => {
                let html = '<h2 class="mb-4">Оберіть категорію:</h2><div class="list-group">';
                categories.forEach(cat => {
                    html += `
                        <a href="#" class="list-group-item list-group-item-action" 
                           onclick="loadBooks('${cat.shortname}')">
                           <strong>${cat.name}</strong><br><small>${cat.notes}</small>
                        </a>`;
                });
                
                // Кнопка Specials (випадкова категорія)
                html += `
                    <a href="#" class="list-group-item list-group-item-action list-group-item-warning mt-3" 
                       onclick="loadRandomCategory()">
                       <strong>✨ Specials (Випадкова категорія)</strong>
                    </a>`;
                
                html += '</div>';
                mainContent.innerHTML = html;
            });
    }

    // Функція для завантаження книг конкретної категорії
    window.loadBooks = function(shortname) {
        fetch(`data/${shortname}.json`)
            .then(res => res.json())
            .then(data => {
                let html = `<h2 class="mb-4">Жанр: ${data.category_name}</h2><div class="row">`;
                data.items.forEach(book => {
                    html += `
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm">
                                <img src="https://placehold.co/200x200?text=${book.name}" class="card-img-top book-img" alt="${book.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${book.name}</h5>
                                    <p class="card-text text-muted">${book.description}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge bg-success fs-6">${book.price} грн</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });
                html += '</div><button class="btn btn-secondary mt-3" onclick="location.reload()">Назад</button>';
                mainContent.innerHTML = html;
            });
    };

    // Випадковий вибір категорії
    window.loadRandomCategory = function() {
        fetch('data/categories.json')
            .then(res => res.json())
            .then(categories => {
                const randomIndex = Math.floor(Math.random() * categories.length);
                loadBooks(categories[randomIndex].shortname);
            });
    };

    catalogLink.addEventListener("click", function(e) {
        e.preventDefault();
        loadCategories();
    });
});
