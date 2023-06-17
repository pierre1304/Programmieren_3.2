/*Funktion des Mutanten:
-falls vollstÃ¤ndig von Gras umringt, mutiert er zu einem Grasfresser
-falls mindestens zur HÃ¤lfte von Gras- oder Fleischfressern umringt, mutiert er zu einem Kannibalen*/

const random = require('./functions.js');

function random(min, max) {
    let rand = Math.random();
    if (typeof min === 'undefined') {
      return rand;
    } else if (typeof max === 'undefined') {
      if (min instanceof Array) {
        return min[Math.floor(rand * min.length)];
      } else {
        return rand * min;
      }
    } else {
      if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
      }
      return rand * (max - min) + min;
    }
}
//const NameDerKlasse = require('/Creature'); falls Creature-Klasse benoetigt
module.exports = class Mutant {


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