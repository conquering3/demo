// 接口
// 一个类可以实现多个接口：
// 接口与接口之间可以是继承关系：
// 接口也可以继承类：


// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}