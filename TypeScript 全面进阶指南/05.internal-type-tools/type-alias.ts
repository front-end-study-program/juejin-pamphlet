// 类型别名 type
// 类型别名的作用主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用

type A = string;

// 抽离联合类型
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);
const status: StatusCode = 502;


// 抽离一个函数类型：
type Handler = (e: Event) => void;
const clickHandler: Handler = (e) => { };
const moveHandler: Handler = (e) => { };
const dragHandler: Handler = (e) => { };


// 声明一个对象类型
type ObjType = {
  name: string;
  age: number;
}

// 与泛型结合使用
type Factory<T> = T | number | string;
const foo: Factory<boolean> = true;
// 一般会在声明一个类型别名来做类型标注
type FactoryWithBool = Factory<boolean>;
const foo1: FactoryWithBool = true;

// 声明一些简单、有实际意义的常用工具类型
type MaybeNull<T> = T | null;
function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

type MaybeArray<T> = T | T[];
function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

export {}