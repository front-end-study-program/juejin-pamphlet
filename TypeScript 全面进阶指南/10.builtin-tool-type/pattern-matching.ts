// 模式匹配工具类型
// 条件类型与 infer 关键字

type FunctionType = (...args: any) => any;

// 函数参数
type MyParameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never;

// 函数返回值
type MyReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : any;

// 函数第一个参数
type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;

type FooFirstParameter = FirstParameter<FuncFoo>; // number
type BarFirstParameter = FirstParameter<FuncBar>; // string


type ClassType = abstract new (...args: any) => any;
// 获取 Class 参数
type MyConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

// 获取 Class 实例类型
type MyInstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;

// 构造函数构造实例声明
export interface _ClassType<TInstanceType = any> {
  new (...args: any[]): TInstanceType;
}

export {};
  