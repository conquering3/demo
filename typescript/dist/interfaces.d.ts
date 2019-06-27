interface Person1 {
    name: string;
    age: number;
}
declare let tom1: Person1;
interface Person2 {
    name: string;
    age?: number;
}
declare let tom2: Person2;
interface Person3 {
    name: string;
    age?: number;
    [propName: string]: any;
}
declare let tom3: Person3;
interface Person4 {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
declare let tom4: Person4;
