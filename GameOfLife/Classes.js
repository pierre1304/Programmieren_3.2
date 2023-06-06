class Grass {


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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


    mul() {
        this.multiply++;
        if (this.multiply >= 4) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grassObj = new Grass(newX, newY);
                grassArr.push(grassObj);
                matrix[newY][newX] = 1;
            }
            this.multiply = 0;
        }
    }
}


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


class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.eatCount = 0;
        this.energy = 15;
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
        let grazerFields = this.chooseFields(2);
        if (grazerFields.length > 0) {
            let theChosenField = random(grazerFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x == this.x && grazerObj.y == this.y) {
                    grazerArr.splice(i, 1);
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
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < predatorArr.length; i++) {
            let predatorObj = predatorArr[i];
            if (predatorObj.x == this.x && predatorObj.y == this.y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }


    mul() {
        if (this.eatCount >= 3) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let predatorObj = new Predator(newX, newY);
                predatorArr.push(predatorObj);
                matrix[newY][newX] = 3;
            }
        }
    }
}


/*Funktion des Kannibalen:
-frisst Fleisch- und Grasfresser
-erhÃ¤lt immer Energie und vermehrt sich, wenn er frisst*/
class Cannibale {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.eatCount = 0;
        this.energy = 7;
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
        let grazerFields = this.chooseFields(2);
        let predatorFields = this.chooseFields(3);
        if (grazerFields.length > 0) {
            let theChosenField = random(grazerFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x == this.x && grazerObj.y == this.y) {
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.eatCount++;
            this.energy++;
        } else if (predatorFields.length > 0) {
            let theChosenField = random(predatorFields);
            let newX = theChosenField[0];
            let newY = theChosenField[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < predatorArr.length; i++) {
                let predatorObj = predatorArr[i];
                if (predatorObj.x == this.x && predatorObj.y == this.y) {
                    predatorArr.splice(i, 1);
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
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < cannibaleArr.length; i++) {
            let cannibaleObj = cannibaleArr[i];
            if (cannibaleObj.x == this.x && cannibaleObj.y == this.y) {
                cannibaleArr.splice(i, 1);
                break;
            }
        }
    }


    mul() {
        if (this.eatCount >= 5) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let cannibaleObj = new Cannibale(newX, newY);
                cannibaleArr.push(cannibaleObj);
                matrix[newY][newX] = 4;
            }
        }
    }
}


/*Funktion des Mutanten:
-falls vollstÃ¤ndig von Gras umringt, mutiert er zu einem Grasfresser
-falls mindestens zur HÃ¤lfte von Gras- oder Fleischfressern umringt, mutiert er zu einem Kannibalen*/


class Mutant {


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = random(60, 120);
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


    mutate() {
        let fieldColor1 = 0;
        let fieldColor2 = 0;
        if (matrix != null && this.x != null && this.y != null) {
            if (matrix[this.y - 1] != null && matrix[this.y - 1][this.x - 1] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y] != null && matrix[this.y][this.x - 1] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y + 1] != null && matrix[this.y + 1][this.x - 1] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y - 1] != null && matrix[this.y - 1][this.x] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y + 1] != null && matrix[this.y + 1][this.x] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y - 1] != null && matrix[this.y - 1][this.x + 1] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y] != null && matrix[this.y][this.x + 1] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y + 1] != null && matrix[this.y + 1][this.x + 1] == 1) {
                fieldColor1++;
            }
            if (matrix[this.y - 1] != null && (matrix[this.y - 1][this.x - 1] == 2 || matrix[this.y - 1][this.x - 1] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y] != null && (matrix[this.y][this.x - 1] == 2 || matrix[this.y][this.x - 1] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y + 1] != null && (matrix[this.y + 1][this.x - 1] == 2 || matrix[this.y + 1][this.x - 1] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y - 1] != null && (matrix[this.y - 1][this.x] == 2 || matrix[this.y - 1][this.x] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y + 1] != null && (matrix[this.y + 1][this.x] == 2 || matrix[this.y + 1][this.x] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y - 1] != null && (matrix[this.y - 1][this.x + 1] == 2 || matrix[this.y - 1][this.x + 1] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y] != null && (matrix[this.y][this.x + 1] == 2 || matrix[this.y][this.x + 1] == 3)) {
                fieldColor2++;
            }
            if (matrix[this.y + 1] != null && (matrix[this.y + 1][this.x + 1] == 2 || matrix[this.y + 1][this.x + 1] == 3)) {
                fieldColor2++;
            }
        }
        if (fieldColor1 == 8) {
            this.die();
            let grazerObj = new Grazer(this.x, this.y);
            grazerArr.push(grazerObj);
            matrix[this.y][this.x] = 2;
        }
        if (fieldColor2 >= 4) {
            this.die();
            let cannibaleObj = new Cannibale(this.x, this.y);
            cannibaleArr.push(cannibaleObj);
            matrix[this.y][this.x] = 4;
        }
    }


    chooseFields(character) {
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


    checkDeath() {
        if (this.energy > 0) {
            this.energy--;
        } else {
            this.die();
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < mutantArr.length; i++) {
            let mutantObj = mutantArr[i];
            if (mutantObj.x == this.x && mutantObj.y == this.y) {
                mutantArr.splice(i, 1);
                break;
            }
        }
    }
}