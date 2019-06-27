// TypeScript 中类的用法
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
}
/* 
TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
private 修饰的属性或方法是私有的，不能在声明它的类的外部访问 // 编译成js后实际是能访问的
protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
 */


// 抽象类
// abstract 用于定义抽象类和其中的抽象方法。
// 首先，抽象类是不允许被实例化的：
// 其次，抽象类中的抽象方法必须被子类实现：