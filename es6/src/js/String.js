const obj = {
    a: 1,
    set foo (x) { this.a = x;},
    get foo () {return this.a}
}
const descriptor= Object.getOwnPropertyDescriptor(obj, 'foo');
console.log(descriptor);
console.log(Object.is({a: 1}, {a: 1}));
console.log(Object.is('{a: 1}', '{a: 1}'));
const originProto = Object.getPrototypeOf(String);
const origin = Object.create(originProto)
console.log(origin);

let ab = {
    a: {b: 1}
}
let ab2 = Object.create(Object.getPrototypeOf(ab), Object.getOwnPropertyDescriptors(ab));
ab.a = 2;
console.log(ab);
console.log(ab2);

const source = {
    set foo(value) {
      console.log(value);
    }
  };
  
/* const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo');
console.log(target2);
let hel = {};
const proto = Object.setPrototypeOf(hel, {on () {return 1}});
console.log(hel.on()); */

const proto = {
    foo: 'hello'
  };
  
  const obj1 = {
    foo: 'world',
    find() {
      return super.foo;
    }
  };
  
  Object.setPrototypeOf(obj1, proto);
  obj1.find() // "hello"
  console.log(obj1);

  const set = new Set([{a: 1}, {b: 2}]);
  console.log(set.entries());
  console.log(set.keys());
  console.log(set.values());
  console.log(Array.from(set));

  const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
console.log(myMap.values());
console.log(myMap);
console.log([...myMap]);

export const on = () => {
};
export const foo = () => {
    
}