"use strict";
// 枚举
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
exports.__esModule = true;
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
// 手动赋值
var Days2;
(function (Days2) {
    Days2[Days2["Sun"] = 7] = "Sun";
    Days2[Days2["Mon"] = 1] = "Mon";
    Days2[Days2["Tue"] = 2] = "Tue";
    Days2[Days2["Wed"] = 3] = "Wed";
    Days2[Days2["Thu"] = 4] = "Thu";
    Days2[Days2["Fri"] = 5] = "Fri";
    Days2[Days2["Sat"] = 6] = "Sat";
})(Days2 || (Days2 = {}));
;
// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
var Days3;
(function (Days3) {
    Days3[Days3["Sun"] = 7] = "Sun";
    Days3[Days3["Mon"] = 8] = "Mon";
    Days3[Days3["Tue"] = 9] = "Tue";
    Days3[Days3["Wed"] = 10] = "Wed";
    Days3[Days3["Thu"] = 11] = "Thu";
    Days3[Days3["Fri"] = 12] = "Fri";
    Days3[Days3["Sat"] = "S"] = "Sat";
})(Days3 || (Days3 = {}));
;
// 常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member)
var import_1 = require("./import");
var hello = require("./import2");
var sortIndex1 = [import_1.SortIndex.a, import_1.SortIndex.b, import_1.SortIndex.c, import_1.SortIndex.e];
console.log(sortIndex1);
console.log(hello);
