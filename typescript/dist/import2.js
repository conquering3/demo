"use strict";
var hello;
(function (hello) {
    hello[hello["x"] = 0] = "x";
    hello[hello["y"] = 1] = "y";
    hello[hello["z"] = 2] = "z";
})(hello || (hello = {}));
module.exports = hello;
