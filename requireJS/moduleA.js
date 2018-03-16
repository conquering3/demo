// define({a: 1, b:1});

/*
define(function () {
    return {a: 1, b:1};
});*/

/*define(function (require, exports, module) {
    console.log(require('./moduleB'));
    return {a: 1};
});*/

/*define(['./moduleB'], function (moduleB) {
    console.log(moduleB);
    console.log(require('./moduleB'));
    return {a: 1};
});*/

/*
// JSONP
define(['https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=1233&json=1&p=3&sid=1422_25809_21123_17001_20719&req=2&bs=requirejs%E4%B8%AD%E6%96%87%E7%BD%91&pbs=12306&csor=4&pwd=123&cb=define'], function (data) {
    console.log(data);
    return {a: 1};
});
*/

define(function (require) {
    var moduleBUrl = require.toUrl('./moduleB');
    console.log(moduleBUrl);
    return {a: 1};
});