// 条件类型基础
// 条件类型中使用 extends 判断类型的兼容性，而非判断类型的全等性。
// 这是因为在类型层面中，对于能够进行赋值操作的两个变量，我们并不需要它们的类型完全相等，只需要具有兼容性

type LiteralType<T> = T extends string ? "string" : "other";

type Res1 = LiteralType<"foo">; // "string"
type Res2 = LiteralType<599>; // "other"

// 嵌套的条件类型
export type LiteralType1<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends null
	? "null"
	: T extends undefined
	? "undefined"
	: never;

type Res3 = LiteralType1<"foo">; // "string"
type Res4 = LiteralType1<599>; // "number"
type Res5 = LiteralType1<true>; // "boolean"


// 以下函数的返回值类型如何声明
// function universalAdd<T extends number | bigint | string>(x: T, y: T) {
//   return x + (y as any);
// }

function universalAdd<T extends number | bigint | string>(
	x: T,
	y: T
): LiteralToPrimitive<T> {
	return x + (y as any);
}
// 同一基础类型的字面量联合类型，其可以被认为是此基础类型的子类型
export type LiteralToPrimitive<T> = T extends number
	? number
	: T extends bigint
	? bigint
	: T extends string
	? string
	: never;

universalAdd(599, 1); // T 填充为 599 | 1
universalAdd("foo", "599"); // T 填充为 foo | 599
universalAdd('foo', 1)


// 条件类型与函数类型
// 我们的条件类型用于判断两个函数类型是否具有兼容性，而条件中并不限制参数类型，仅比较二者的返回值类型
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;