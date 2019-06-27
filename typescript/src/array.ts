// 数组
// 数组的项中不允许出现其他的类型

// 「类型 + 方括号」表示法
let fibonacci1: number[] = [1, 1, 2, 3, 5];

// 数组泛型
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];

// 用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];

// 任意类型数组
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];

// 类数组
// 常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
function sum () {
    let args: IArguments = arguments;

    console.log(args);
}

export {}


