// typescript

// 原始数据类型在ts中的应用
// boolean
let isBoolean: boolean = false;

// 类型不对, 编译报错
let createdByNewBoolean: boolean = Boolean(1);

// number
let decLiteral: number = 6;

// string
let myName: string = 'Tom';

// void
function alertName(): void {
    alert('My name is Tom');
}
// 无返回值

// undefined and null
let u: undefined = undefined;
let n: null = null

// 任意值
let anyVar: any = 'tom';
anyVar = 7;

// 类型推论， 如果一开始没有指定类型，ts会根据赋值推断类型
// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查


// 联合类型（Union Types）表示取值可以为多种类型中的一种
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
/* function getLength(something: string | number): number {
    return something.length;
} */
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
/* myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错 */
// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.


// 类型断言
// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}


import axios from 'axios';