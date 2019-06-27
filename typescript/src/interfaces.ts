// 接口
// 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

// 什么是接口
// 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。

// TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

// 固定属性接口
// 接口的属性在实例化的时候，不能增加也不能减少，否则报错
interface Person1 {
    name: string;
    age: number;
}

let tom1: Person1 = {
    name: 'Tom',
    age: 25
};

// 可选属性接口
// 接口属性可减少
interface Person2 {
    name: string;
    age?: number;
}

let tom2: Person2 = {
    name: 'Tom'
};

// 任意属性接口
// 接口属性可增加
// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
interface Person3 {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom3: Person3 = {
    name: 'Tom',
    gender: 'male'
};

// 只读属性
interface Person4 {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom4: Person4 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
// tom4.id = 9527;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.