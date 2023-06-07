class Grazer {


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.eatCount = 0;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseFields(character) {
        this.newDirections();
        let found = [];
        for (let i in this.directions) {
            i = parseInt(i);
            let fieldPos = this.directions[i];
            let posX = fieldPos[0];
            let posY = fieldPos[1];
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] == character) {
                    found.push(fieldPos);
                }
            }
        }
        return found;
    }


    eat() {
        let grassFields = this.chooseFields(1);
        if (grassFields.length > 0) {
            let theChosenField = random(grassFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grassArr.length; i++) {
                let grassObj = grassArr[i];
                if (grassObj.x == this.x && grassObj.y == this.y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.eatCount++;
            this.energy++;
        } else {
            this.eatCount = 0;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            } else {
                this.move();
            }
        }
    }


    move() {
        let emptyFields = this.chooseFields(0);
        if (emptyFields.length > 0 && this.energy > 0) {
            let theChosenField = random(emptyFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grazerArr.length; i++) {
            let grazerObj = grazerArr[i];
            if (grazerObj.x == this.x && grazerObj.y == this.y) {
                grazerArr.splice(i, 1);
                break;
            }
        }
    }


    mul() {
        if (this.eatCount > 5) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grazerObj = new Grazer(newX, newY);
                grazerArr.push(grazerObj);
                matrix[newY][newX] = 2;
            }
        }
    }
}
