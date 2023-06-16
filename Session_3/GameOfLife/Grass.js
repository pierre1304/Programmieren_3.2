//const NameDerKlasse = require('/Creature'); falls Creature-Klasse benoetigt
module.exports = class Grass {


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
