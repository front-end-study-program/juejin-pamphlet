// 模板字符串类型
// 内部通过与 JavaScript 中模板字符串相同的语法（${}），使用了另一个类型别名 World，其最终的类型就是将两个字符串类型值组装在一起返回
type World = 'World';

// "Hello World"
type Greeting = `Hello ${World}`;


// 插槽通过泛型参数传入
// 并不是所有值都能被作为模板插槽
// 目前有效的类型只有 string | number | boolean | null | undefined | bigint
type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;

type Greet1 = Greet<"foo">; // "Hello foo"
type Greet2 = Greet<599>; // "Hello 599"
type Greet3 = Greet<true>; // "Hello true"
type Greet4 = Greet<null>; // "Hello null"
type Greet5 = Greet<undefined>; // "Hello undefined"
type Greet6 = Greet<0x1fffffffffffff>; // "Hello 9007199254740991"


// 插槽传入一个类型
// Greeting1 类型并不会变成 Hello string，而是保持原样
// 所有 Hello 开头的字面量类型都会被视为 Hello ${string} 的子类型
type Greeting1 = `Hello ${string}`;


// 场景

// 版本号控制
type Version = `${number}.${number}.${number}`;
const v2: Version = '1.0.0';

// 声明大量存在关联的字符串字面量类型时，
// 模板字符串类型也能在减少代码的同时获得更好的类型保障
type SKU =
  | 'iphone-16G-official'
  | 'xiaomi-16G-official'
  | 'honor-16G-official'
  | 'iphone-16G-second-hand'
  | 'xiaomi-16G-second-hand'
  | 'honor-16G-second-hand'
  | 'iphone-64G-official'
  | 'xiaomi-64G-official'
  | 'honor-64G-official'
  | 'iphone-64G-second-hand'
  | 'xiaomi-64G-second-hand'
  | 'honor-64G-second-hand';

// 自动分发的特性
type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';
type optimizationSKU = `${Brand}-${Memory}-${ItemType}`;


// 泛型分发
type SizeRecord<Size extends string> = `${Size}-Record`;
type Size = 'Small' | 'Middle' | 'Large';
type UnionSizeRecord = SizeRecord<Size>;