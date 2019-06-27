declare function sum3(x: number, y: number): number;
declare let mySum1: (x: number, y: number) => number;
declare let mySum2: (x: number, y: number) => number;
interface SearchFunc {
    (source: string, subString: string): boolean;
}
declare let mySearch: SearchFunc;
declare function buildName1(firstName: string, lastName?: string): string;
declare let tomcat1: string;
declare let tom: string;
declare function buildName2(firstName: string | undefined, lastName: string): string;
declare let tomcat2: string;
declare let cat: string;
declare function push(array: any[], ...items: any[]): void;
declare function reverse(x: number): number;
declare function reverse(x: string): string;
