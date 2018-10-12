require('@/scss/style.scss');
require('@/scss/app2.scss');
/* let hello = (man) =>{console.log(man)};
hello('webpack es6');
const sy = Symbol();
console.log(typeof sy);
console.log(sy);
console.log(sy.toString());
var pipe = (function () {
return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
        get : function (pipeObject, fnName, receiver) {
            if (fnName === 'get') {
                return funcStack.reduce(function (val, fn) {
                    return fn(val);
                }, value);
            }
            funcStack.push(window[fnName]);
            return oproxy;
        }
    });
    return oproxy;
    }
}());

window.double = n => n * 2;
window.pow    = n => n * n;
window.reverseInt = n => n.toString().split("").reverse().join("") | 0;
const proxy = pipe(3);
console.log(proxy);
let a = proxy.double.pow.reverseInt.get; // 63
console.log(a);
console.log(Reflect.get({a: 1}, 'a'));
console.log();
var promise = new Promise((resolve, reject) => {
    return reject('error');
    resolve(123)
});
// promise.then(val => {console.log(val);}, error => {console.log(error);});
promise.catch(error => {console.log(error);});
// iterator
var clock = function* () {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};
window.clockG = clock();
function* gen(x){
    try {
      var y = yield x + 2;
    } catch (e){
      console.log(e);
    }
    return y;
  }
  
var g = gen(1);
g.next();
console.log(g.return(7));
g.throw('出错了'); */
class Test {
    static a = 1;
    name;
    age;
    sex = '男';
    constructor (name, age) {
        this.name = name || 'unknow';
        this.age = age || 'unknow';
    }
}
Test.prototype.sayHello = function () { console.log('Hello, my name is ' + this.name + ':' + this.sex);}
const test = new Test('gss', 18);
test.sayHello();
console.log(Test.a);
class TestChild extends Test {

}
const tChild = new TestChild('child', 4);
tChild.sayHello();
const tP = Reflect.getPrototypeOf(new Test());
console.log(tP === Test.prototype);
console.log(new Test().__proto__ === Test.prototype);
console.log(tP === new Test().__proto__);
[1,2,3].map(() => {
    console.log(this);
});
function a (a = 1, b = 2, c = false) {
    console.log(a, b, c);
}
a();