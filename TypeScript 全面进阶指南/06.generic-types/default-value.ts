// 泛型约束与默认值

// 默认值 T = boolean
type Factory<T = boolean> = T | number | string;
const foo: Factory = false;

// 泛型约束 extends

type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';

type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。