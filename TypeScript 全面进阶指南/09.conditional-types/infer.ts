// infer 关键字
// 在条件类型中提取类型的某一部分信息
// infer 只能在条件类型中使用

type Func = (...args: any[]) => any

type FunctionReturnType<T extends Func> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type StringType = FunctionReturnType<() => string>;
type BooleanType = FunctionReturnType<() => boolean>;
type NumberType = FunctionReturnType<() => number>;

// 数组的类型提取
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;
type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]


// rest 操作符(...)来处理任意长度
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;


// 数组 -> 联合类型

type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // (string | number)[] -> string | number


// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

// 反转键名与键值
// & string 来确保属性名为 string 类型的小技巧
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never
type ReverseKeyValueResult1 = ReverseKeyValue<{ "key": "value", 'foo': 'bar' }>; // { "value": "key" | "foo", "bar": "key" | "foo" }

// 不使用 & string，V 的值可以是任何类型，此处就不满足对象 key 类型
type ReverseKeyValue1<T extends Record<string, string>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V, K>
  : never;


// 提取 Promise 的类型
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>;


// infer 的嵌套提取
type PromiseValue1<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T;

type PromiseValueResult4 = PromiseValue1<Promise<Promise<boolean>>>;


// infer 的递归
type PromiseValue2<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
type PromiseValueResult5 = PromiseValue1<Promise<Promise<Promise<boolean>>>>;

