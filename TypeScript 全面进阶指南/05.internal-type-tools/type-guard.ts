// 类型守卫
// 类型守卫有些类似于类型断言，但类型守卫更宽容，也更信任你一些。你指定什么类型，它就是什么类型

function isString(input: unknown): boolean {
  return typeof input === "string";
}

// 将函数提取到外部，ts 的类型控制流分析是没有办法正确识别
function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    (input).replace("foo", "bar")
  }
  if (typeof input === 'number') { }
  // ...
}

// is 关键字来显示的提供类型信息,
function isString1(input: unknown): input is string {
  return typeof input === "string";
}
function foo1(input: string | number) {
  if (isString1(input)) {
    // 正确了
    (input).replace("foo", "bar")
  }
  if (typeof input === 'number') { }
  // ...
}

// 需要注意的是，类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查
function isString2(input: unknown): input is number {
  return typeof input === "string";
}

function foo2(input: string | number) {
  if (isString(input)) {
    // 报错，在这里变成了 number 类型
    (input).replace("foo", "bar")
  }
  if (typeof input === 'number') { }
  // ...
}


// 类型守卫中使用对象类型、联合类型
export type Falsy = false | "" | 0 | null | undefined;
export const isFalsy = (val: unknown): val is Falsy => !val;
// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;
export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);



// in 操作符

interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}
interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}
function handle(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}


// instanceof
class FooBase {}

class BarBase {}

class Foo extends FooBase {
  fooOnly1() {}
}
class Bar extends BarBase {
  barOnly1() {}
}

function handle1(input: Foo | Bar) {
  if (input instanceof FooBase) {
    input.fooOnly1();
  } else {
    input.barOnly1();
  }
}