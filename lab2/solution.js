var car1 = new Object();
        car1.color = "Red";
        car1.maxSpeed = 140;
        car1.driver = {
            name: "Сєроух Варвара",
            category: "C",
            "personal limitations": "No driving at night"
        };
        car1.tuning = true;
        car1["number of accidents"] = 0;

        var car2 = {
            color: "Blue",
            maxSpeed: 180,
            driver: {
                name: "Сєроух Варвара",
                category: "B",
                "personal limitations": null
            },
            tuning: false,
            "number of accidents": 2
        };

        car1.drive = function() {
            console.log("I am not driving at night");
        };
        car2.drive = function() {
            console.log("I can drive anytime");
        };

        console.log("--- Перевірка Кроку 1 ---");
        car1.drive();
        car2.drive();

        function Truck(color, weight, avgSpeed, brand, model) {
            this.color = color;
            this.weight = weight;
            this.avgSpeed = avgSpeed;
            this.brand = brand;
            this.model = model;

            this.trip = function() {
                if (!this.driver) {
                    console.log("No driver assigned");
                } else {
                    var msg = "Driver " + this.driver.name;
                    msg += this.driver.nightDriving ? " drives at night" : " does not drive at night";
                    msg += " and has " + this.driver.experience + " years of experience";
                    console.log(msg);
                }
            };
        }

        Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
            this.driver = {
                name: name,
                nightDriving: nightDriving,
                experience: experience
            };
        };

        var truck1 = new Truck("White", 8000, 70, "MAN", "TGX");
        var truck2 = new Truck("Yellow", 5500, 85, "Mercedes", "Actros");

        truck1.AssignDriver("Сєроух Варвара", true, 5);
        truck2.AssignDriver("Сєроух Варвара", false, 2);

        console.log("--- Перевірка Кроку 2 ---");
        truck1.trip();
        truck2.trip();

class Square {
    constructor(a) {
        this.a = a; 
    }

    static help() {
        console.log("Квадрат — це правильний чотирикутник, у якого всі сторони рівні.");
    }

    length() {
        console.log("Сума довжин сторін (Периметр): " + (4 * this.a)); 
    }

    square() {
        console.log("Площа: " + (this.a * this.a)); 
    }

    info() {
        console.log(`Квадрат:
        - Сторони: 4 по ${this.a} 
        - Кути: 4 по 90° 
        - Периметр: ${4 * this.a} 
        - Площа: ${this.a * this.a}`);
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a); 
        this.b = b; 
    }

    static help() {
        console.log("Прямокутник — це чотирикутник, у якого всі кути прямі (90°).");
    }

    length() {
        console.log("Сума довжин сторін прямокутника: " + (2 * (this.a + this.b)));
    }

    square() {
        console.log("Площа прямокутника: " + (this.a * this.b));
    }

    info() {
        console.log(`Прямокутник:
        - Сторони: a=${this.a}, b=${this.b}
        - Кути: 4 по 90°
        - Периметр: ${2 * (this.a + this.b)}
        - Площа: ${this.a * this.b}`);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha; 
        this.beta = beta;   
    }

    static help() {
        console.log("Ромб — це паралелограм, у якого всі сторони рівні.");
    }

    length() {
        console.log("Сума довжин сторін ромба: " + (4 * this.a)); 
    }

    square() {
        let area = (this.a * this.a * Math.sin(this.beta * Math.PI / 180)).toFixed(2);
        console.log("Площа ромба: " + area);
    }

    info() {
        console.log(`Ромб:
        - Сторони: 4 по ${this.a}
        - Кути: alpha=${this.alpha}°, beta=${this.beta}°
        - Периметр: ${4 * this.a}
        - Площа: ${(this.a * this.a * Math.sin(this.beta * Math.PI / 180)).toFixed(2)}`);
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Паралелограм — чотирикутник, у якого протилежні сторони паралельні.");
    }

    length() {
        console.log("Сума довжин сторін паралелограма: " + (2 * (this.a + this.b)));
    }

    square() {
        let area = (this.a * this.b * Math.sin(this.beta * Math.PI / 180)).toFixed(2);
        console.log("Площа паралелограма: " + area);
    }  

    info() {
        console.log(`Паралелограм:
        - Сторони ${this.a} і ${this.b}
        - Кути ${this.alpha}° і ${this.beta}°
        - Периметр ${2*(this.a+this.b)}
        - Площа ${this.a * this.b * Math.sin(this.beta * Math.PI / 180)}`);
    }
}
        
console.log("--- Перевірка Кроку 3 ---");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

const mySquare = new Square(5);
const myRect = new Rectangle(4, 8);
const myRhombus = new Rhombus(6, 120, 60);
const myParallelogram = new Parallelogram(3, 7, 110, 70)

mySquare.info();
myRect.info();
myRhombus.info();
myParallelogram.info();

Object.defineProperty(Rhombus.prototype, 'sideA', {
    get: function() { return this.a; },
    set: function(value) { this.a = value; }
});

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

function PiMultiplier(factor) {
    return function() {
        return (Math.PI * factor).toFixed(2);
    };
}

function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}

console.log("--- Перевірка Кроку 4 ---");
const tri1 = Triangular();
const tri2 = Triangular(6, 8, 10);
console.log("Трикутники:", tri1, tri2);

const piMult2 = PiMultiplier(2);
const piMult2Div3 = PiMultiplier(2/3);
const piDiv2 = PiMultiplier(1/2);

console.log("PI * 2 =", piMult2());
console.log("PI * 2/3 =", piMult2Div3());
console.log("PI / 2 =", piDiv2());

let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");

let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("Object 1:");
PaintBlue(obj1); PaintRed(obj1); PaintYellow(obj1);

console.log("Object 2:");
PaintBlue(obj2); PaintRed(obj2); PaintYellow(obj2);

console.log("Object 3:");
PaintBlue(obj3); PaintRed(obj3); PaintYellow(obj3);
