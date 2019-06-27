// 元组
// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
let xcatliu: [string, number] = ['Xcat Liu', 25];

// 越界的元素
// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
let xcatliu: [string, number, boolean];
xcatliu = ['Xcat Liu', 25];
xcatliu.push('http://xcatliu.com/');
xcatliu.push(true);
// index.ts(4,14): error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.