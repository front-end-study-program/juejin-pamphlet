// 结构工具类型进阶
// 基于键值类型的 Pick 与 Omit
import { expectType } from 'tsd'
type FuncStruct = (...args: any[]) => any;

type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
}[keyof T];

// 以上 FunctionKeys 可拆分为以下步骤，最后获得联合类型
type Tmp<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
};
type Res = Tmp<{
  foo: () => void;
  bar: () => number;
  baz: number;
}>;
type WhatWillWeGet = Res[keyof Res]; // "foo" | "bar"

// 基于键值类型查找属性，将预期类型也作为泛型参数
// 为了避免可选属性对条件类型语句造成干扰，这里我们使用 -? 移除了所有可选标记
type ExpectedPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];
type FunctionKeys1<T extends object> = ExpectedPropKeys<T, FuncStruct>;
expectType<
  FunctionKeys1<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
>('foo');

expectType<
  FunctionKeys1<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
  // 报错，因为 baz 不是函数类型属性
>('baz');


// 将查找键值类型出来的属性联合类型，转换为结构类型
export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ExpectedPropKeys<T, ValueType>
>;
expectType<PickByValueType<{ foo: string; bar: number }, string>>({
  foo: 'foo',
});

expectType<
  PickByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  foo: 'foo',
  bar: 599,
});


// 将符合键值类型的属性排除
type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;

expectType<OmitByValueType<{ foo: string; bar: number }, string>>({
  bar: 599,
});

expectType<
  OmitByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  baz: true,
});

// 子结构的互斥处理