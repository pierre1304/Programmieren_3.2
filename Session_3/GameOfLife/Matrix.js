/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
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

const matrix = getRandMatrix(71, 37);

module.exports = matrix;