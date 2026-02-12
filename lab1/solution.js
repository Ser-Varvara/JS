// Вивід інструкції на початку 
console.log("Інструкція до функції triangle:");
console.log("Використання: triangle(значення1, 'тип1', значення2, 'тип2')");
console.log("Можливі типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'.");

function triangle(val1, type1, val2, type2) {
    const toRad = (deg) => (deg * Math.PI) / 180; // [cite: 27]
    const toDeg = (rad) => (rad * 180) / Math.PI;

    // Перевірка на від'ємні або нульові значення [cite: 30]
    if (val1 <= 0 || val2 <= 0) {
        return "Zero or negative input";
    }

    let a, b, c, alpha, beta;

    // Створюємо карту значень для зручності
    const data = { [type1]: val1, [type2]: val2 };
    const types = Object.keys(data);

    // Валідація комбінацій типів [cite: 29]
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: Неправильний тип аргументу. Перечитайте інструкцію.");
        return "failed";
    }

    // ЛОГІКА ОБЧИСЛЕНЬ (Math) [cite: 12]
    if (types.includes("leg") && types.includes("hypotenuse")) {
        a = data.leg;
        c = data.hypotenuse;
        if (a >= c) { console.log("Катет не може бути більшим за гіпотенузу"); return "failed"; }
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } 
    else if (types.includes("leg") && types.includes("opposite angle")) {
        a = data.leg;
        alpha = data["opposite angle"];
        if (alpha >= 90) return "Incorrect angle";
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    else if (types.includes("leg") && types.includes("adjacent angle")) {
        b = data.leg;
        beta = data["adjacent angle"];
        if (beta >= 90) return "Incorrect angle";
        c = b / Math.cos(toRad(beta));
        a = Math.sqrt(c * c - b * b);
        alpha = 90 - beta;
    }
    else if (types.includes("hypotenuse") && types.includes("angle")) {
        c = data.hypotenuse;
        alpha = data.angle;
        if (alpha >= 90) return "Incorrect angle";
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
        beta = 90 - alpha;
    }
    else {
        console.log("Несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    // Вивід результатів [cite: 28]
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success"; // [cite: 29]
}
