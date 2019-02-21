// OOB
function GsTools () {

}
// sum 
GsTools.prototype.sum = function () {
    var sum = 0;
    arguments.map(function (val) {
        sum += val;
    });
    return sum;
}

module.exports.gsTools = new GsTools();