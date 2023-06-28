const Grass = require('./Grass.js');
const Grazer = require('./Grazer.js');
const Predator = require('./Predator.js');
const Mutant = require('./Mutant.js');
const Cannibale = require('./Cannibale.js');
const random = require('./functions.js');

let side = 20;
/*let*/ grassArr = [];
/*let*/ grazerArr = [];
/*let*/ predatorArr = [];
/*let*/ cannibaleArr = [];
/*let*/ mutantArr = [];


/* io.on('connection, function(socket) {
    console.log("connection", io.engine.clientsCount);
})

socket.emit('send matrix', matrix);

if (engine.clientsCount === 1) {
    initGame();
    setInterval(function () {
        updateGame();
        socket.emit('send matrix', matrix);
    }, 1000);
}
 */

function setup() {  
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
    console.log("update game");
    /*for(let y in matrix) {
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
            //rect(x * side, y * side, side, side);
        }
    }*/
}

setup();
setInterval(draw, 1000);