// 索引类型
// 包含三个部分：索引签名类型、索引类型查询与索引类型访问
// 索引类型的最佳拍档之一就是映射类型

// ------------ 索引签名类型 [key: string] -----------
// 索引签名类型主要指的是在接口或类型别名中，通过以下语法来快速声明一个键值类型一致的类型结构
// [key: string] 意味着在实现这个类型结构的变量中只能声明字符串类型的键
interface IAllStringTypes {
  [key: string]: string;
}

type AllStringTypes = {
  [key: string]: string;
}

type PropType1 = IAllStringTypes['foo']; // string
type PropType2 = AllStringTypes['bar']; // string

const foo: AllStringTypes = {
  "foo": "599",
  599: "foo",
  [Symbol("ddd")]: 'symbol',
}


// 索引签名类型和具体的键值对类型声明并存
// 这些具体的键值类型也需要符合索引签名类型的声明
interface AllStringTypes1 {
  // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  propA: number;
  [key: string]: boolean;
}

interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}


// ----------- 索引类型查询 keyof -----------
// 可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型
interface Foo {
  foo: 1,
  599: 2
}

type FooKeys = keyof Foo; // foo | 599


// 所有可作为对象键的联合类型
type AnyKeys = keyof any // string | number | symbol



// ---------- 索引类型访问 obj[expression] -------

interface NumberRecord {
  [key: string]: number;
}
type PropType = NumberRecord[string]; // number

// 字面量类型来进行索引类型访问
interface Foo1 {
  propA: number;
  propB: boolean;
}
type PropAType = Foo1['propA']; // number
type PropBType = Foo1['propB']; // boolean

// keyof 操作符来进行索引类型访问
interface Foo2 {
  propA: number;
  propB: boolean;
  propC: string;
}
type PropTypeUnion = Foo2[keyof Foo2]; // string | number | boolean


// ---------------- 映射类型 ----------------
// 映射类型指的就是一个确切的类型工具
// 映射类型的主要作用即是基于键名映射到键值类型
type Stringify<T> = {
  [K in keyof T]: string;
};
interface Foo3 {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}
type StringifiedFoo = Stringify<Foo3>;

type Clone<T> = {
  [K in keyof T]: T[K];
};
type CloneFoo3 = Clone<Foo3>