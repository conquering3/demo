(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "UDOl":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/*! exports provided: hello, default */
/***/ (function(module) {

module.exports = {"hello":"world"};

/***/ }),

/***/ "e6Wu":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./app3 */ "zcAa");

__webpack_require__(/*! @/scss/index.scss */ "hZTp");

var json = __webpack_require__(/*! ../data.json */ "UDOl");
console.log(json);
console.log('hello webpack4');

/***/ }),

/***/ "hZTp":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "zcAa":
/*!************************!*\
  !*** ./src/js/app3.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    a: 0
};

/***/ })

},[["e6Wu","manifest","vendors~app"]]]);