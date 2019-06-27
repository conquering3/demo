// 函数


// 函数声明
function sum (x: number, y: number): number {
    return x + y;
}


// 函数表达式
let mySum1 = function (x: number, y: number): number {
    return x + y;
};
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let mySum2: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 可选参数
// 可选参数后面不允许再出现必须参数了 
function buildName1(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat1 = buildName1('Tom', 'Cat');
let tom = buildName1('Tom');

// 参数默认值
// TypeScript 会将添加了默认值的参数识别为可选参数
function buildName2(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat2 = buildName2('Tom', 'Cat');
// 此时就不受「可选参数必须接在必需参数后面」的限制了：
let cat = buildName2(undefined, 'Cat');

// 剩余参数
// items rest 参数只能是最后一个参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

// 重载
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    return x;
}