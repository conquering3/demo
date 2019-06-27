// 接口
// 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
var tom1 = {
    name: 'Tom',
    age: 25
};
var tom2 = {
    name: 'Tom'
};
var tom3 = {
    name: 'Tom',
    gender: 'male'
};
var tom4 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
// tom4.id = 9527;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
//# sourceMappingURL=interfaces.js.map