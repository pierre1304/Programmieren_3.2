/*Funktion des Kannibalen:
-frisst Fleisch- und Grasfresser
-erhaelt immer Energie und vermehrt sich, wenn er frisst*/

//const NameDerKlasse = require('/Creature'); falls Creature-Klasse benoetigt
module.exports = class Cannibale {
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
