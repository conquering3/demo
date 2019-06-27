// 数组
// 数组的项中不允许出现其他的类型
// 「类型 + 方括号」表示法
var fibonacci1 = [1, 1, 2, 3, 5];
// 数组泛型
var fibonacci2 = [1, 1, 2, 3, 5];
var fibonacci3 = [1, 1, 2, 3, 5];
// 任意类型数组
var list = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
// 类数组
// 常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
function sum() {
    var args = arguments;
    console.log(args);
}
var person = {
    name: 'Tom',
    age: 15
};
//# sourceMappingURL=array.js.map