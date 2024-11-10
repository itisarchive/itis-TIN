function forLoop() {
    for (let i = 1; i < 10; i++) {
        console.log("Jest to " + i + "-ta iteracja pętli for");
    }
}

function whileLoop() {
    let i = 1;
    while (i < 10) {
        console.log("Jest to " + i + "-ta iteracja pętli while");
        i++;
    }
}

function forInLoop() {
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };
    for (let prop in obj) {
        console.log(prop + " = " + obj[prop]);
    }
}

function forOfLoop() {
    let arr = [1, 2, 3];
    for (let element of arr) {
        console.log(element);
    }
}

function ifStatement(a, b) {
    if (a > b) {
        console.log(a + " jest większe od " + b);
    } else {
        console.log(b + " jest większe od " + a);
    }
}

function calculate(a, b, ...rest) {
    let sum = a + b;
    for (let elem of rest) {
        sum += elem;
    }
    if (!isNaN(sum)) {
        return sum;
    } else {
        return new Error("One of the arguments is not a number!");
    }
}

function concatenate(...args) {
    let result = "";
    for (let elem of args) {
        result += elem;
    }
    return result;
}

function transform(transformer, ...args) {
    let result = [];
    for (let elem of args) {
        result.push(transformer(elem));
    }
    return result;
}

forLoop();
whileLoop();
forInLoop();
forOfLoop();
ifStatement(2, 3);

console.log("Suma to " + calculate(1, "2", 3));
console.log(calculate(1, 2, 'a'));
console.log(concatenate(1, 2, "a string"));

let squareRoot = function (num) {
    return Math.sqrt(num);
}
let cubicRoot = function (num) {
    return Math.cbrt(num);
}
let args = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(args);
console.log(transform(squareRoot, ...args));
console.log(transform(cubicRoot, ...args));

function Person(name, age, isMale) {
    this.name = name;
    this.age = age;
    this.isMale = isMale;
    this.introduce = function () {
        console.log("Hej, jestem " + this.name + ", mam " + this.age + " lat i jestem " + (this.isMale ? "mężczyzną" : "kobietą"));
    }
}

let person = new Person("Jasio", 25, true);
person.introduce();

class Animal {
    constructor(name, age, isAlive) {
        this.name = name;
        this.age = age;
        this.isAlive = isAlive;
    }

    makeSound() {
        console.log("<zwierzę " + this.name + " wydaje dźwięk>");
    }
}

let animal = new Animal("Burek", 5, true);
animal.makeSound();
