// 类型别名中的泛型

type Factory<T> = T | number | string;

type Stringify<T> = {
  [K in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};

type _Partial<T> = {
  [P in keyof T]?: T[P];
};

interface IFoo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type PartialIFoo = _Partial<IFoo>;
// 等价于
interface PartialIFoo1 {
  prop1?: string;
  prop2?: number;
  prop3?: boolean;
  prop4?: () => void;
}

// 条件类型

type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<''>; // 2