// 枚举
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true


// 手动赋值
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
enum Days3 {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};

// 常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member)
import { SortIndex } from "./import";
import hello = require('./import2');

let sortIndex1 = [SortIndex.a, SortIndex.b, SortIndex.c, SortIndex.e];

console.log(sortIndex1);
console.log(hello);