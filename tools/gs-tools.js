/**
 * @description my tools Gstools OOB
 */
function GsTools () {

}

/**
 * @description numbers sum
 * @param {...number} arguments is not need
 * @return {number} numbers sum
 */
GsTools.prototype.sum = function () {
    var sum = 0;
    arguments.map(function (val) {
        sum += val;
    });
    return sum;
}

/**
 * @description random create word
 * @param {number} n random numbers is need
 * @param {Array} arr random arr is not need
 * @return {string} random word
 */
GsTools.prototype.randomWord = function (n, arr) {
    var word = '';

    arr = arr || [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '<', '>', '-', '_', '(', ')', '*', '&', '^', '+', '$', '!', '~', '/'
    ];
    for (var i = 0; i < n; i++) {
        word += arr[Math.floor(Math.random()*arr.length)];
    }
    return word;
}
const gsTools = new GsTools();

module.exports = gsTools;