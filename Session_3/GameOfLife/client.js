function main () {
    console.log("main");
    const socket = io();

    function openMatrix (matrixData) {
        //draw matrix
        matrix = matrixData;
        draw();
    }
    socket.on('send matrix', openMatrix)
}

main();
let matrix = [];
let side = 10;
let fr = 5;
function setup() {
    //canvas
    background('#acacac');
    frameRate(fr);
}

function draw() {
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