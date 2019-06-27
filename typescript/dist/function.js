// 函数
// 函数声明
function sum3(x, y) {
    return x + y;
}
// 函数表达式
var mySum1 = function (x, y) {
    return x + y;
};
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
var mySum2 = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 可选参数
// 可选参数后面不允许再出现必须参数了 
function buildName1(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomcat1 = buildName1('Tom', 'Cat');
var tom = buildName1('Tom');
// 参数默认值
// TypeScript 会将添加了默认值的参数识别为可选参数
function buildName2(firstName, lastName) {
    if (firstName === void 0) { firstName = 'Tom'; }
    return firstName + ' ' + lastName;
}
var tomcat2 = buildName2('Tom', 'Cat');
// 此时就不受「可选参数必须接在必需参数后面」的限制了：
var cat = buildName2(undefined, 'Cat');
// 剩余参数
// items rest 参数只能是最后一个参数
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    return x;
}
//# sourceMappingURL=function.js.map