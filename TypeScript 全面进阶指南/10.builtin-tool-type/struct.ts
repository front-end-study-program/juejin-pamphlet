// 结构工具类型
// 条件类型以及映射类型、索引类型
// 结构工具类型其实又可以分为两类: 

// 结构声明：快速声明一个结构，比如内置类型中的 Record

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

type Dictionary<T> = {
  [index: string]: T;
};

type NumericDictionary<T> = {
  [index: number]: T;
};


// 结构处理：对结构类型的 key 和 value 进行处理

// 保留 T 泛型参数的 key
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface Foo {
  name: string;
  age: number;
  job:boolean;
}

type PickedFoo = MyPick<Foo, "name" | "age">


// 移除 K 类型的 key
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
