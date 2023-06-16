const Grass = require('./Grass.js');
const Grazer = require('./Grazer.js');
const Predator = require('./Predator.js');
const Mutant = require('./Mutant.js');
const Cannibale = require('./Cannibale.js');

let side = 20;
let grassArr = [];
let grazerArr = [];
let predatorArr = [];
let cannibaleArr = [];
let mutantArr = [];
let matrix = [];

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandMatrix(cols, rows) {
    let matrix = [];
    for(let y = 0; y < rows; y++) {
        matrix[y] = []; 
        for(let x = 0; x < cols; x++) {
            matrix[y][x] = Math.round(random(0, 5));
        }
    }
    return matrix;
}

function setup() {  
    matrix = getRandMatrix(71, 37);
    //createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    //background(50);
    //frameRate(5);
    for(let y in matrix) {
        y = parseInt(y);
        for(let x in matrix[y]) {
            x = parseInt(x);
            if(matrix[y][x] == 1) {
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            } else if(matrix[y][x] == 2) {
                let grazerObj = new Grazer(x, y);
                grazerArr.push(grazerObj);
            } else if(matrix[y][x] == 3) {
                let predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            } else if(matrix[y][x] == 4) {
                let cannibaleObj = new Cannibale(x, y);
                cannibaleArr.push(cannibaleObj);
            } else if(matrix[y][x] == 5) {
                let mutantObj = new Mutant(x, y);
                mutantArr.push(mutantObj);
            }
        }
    }
}

function draw() {
    for(let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        grassObj.mul();
    }
    for(let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();
    }
    for(let i = 0; i < predatorArr.length; i++) {
        let predatorObj = predatorArr[i];
        predatorObj.eat();
        predatorObj.mul();
    }
    for(let i = 0; i < cannibaleArr.length; i++) {
        let cannibaleObj = cannibaleArr[i];
        cannibaleObj.eat();
        cannibaleObj.mul();
    }
    for(let i = 0; i < mutantArr.length; i++) {
        let mutantObj = mutantArr[i];
        mutantObj.mutate();
        mutantObj.checkDeath();
    }
    for(let y in matrix) {
        y = parseInt(y);
        for(let x in matrix[y]) {
            x = parseInt(x);
            let farbWert = matrix[y][x];
            fill(50);
            if (farbWert === 1) {
                fill(0, 155, 0);
            } else if (farbWert === 2) {
                fill(255, 255, 0);
            } else if (farbWert === 3) {
                fill(255, 0, 0);
            } else if (farbWert === 4) {
                fill(255, 125, 0);
            } else if (farbWert === 5) {
                fill(0, 0, 255);
            }
            rect(x * side, y * side, side, side);
        }
    }
}

setup();
setInterval(draw, 1000);