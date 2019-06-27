// 声明文件
// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
/*
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
export 导出变量
export namespace 导出（含有子属性的）对象
export default ES6 默认导出
export = commonjs 导出模块
export as namespace UMD 库声明全局变量
declare global 扩展全局变量
declare module 扩展模块
/// <reference /> 三斜线指令
*/
jQuery('#foo');
// src/index.ts
jQuery('#foo');
// 第三方声明文件
// @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可
// npm install @types/jquery --save-dev
// 书写声明文件
// 当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了
// 全局变量
/* /path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json */
// 如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置
/*
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
*/
// declare class 语句也只能用来定义类型，不能用来定义具体的实现
//# sourceMappingURL=declare.js.map