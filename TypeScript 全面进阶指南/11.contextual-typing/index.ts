// 上下文类型
//  TypeScript 中另外一种类型推导

// 以下的 onerror 参数已经有了对应的类型声明
window.onerror = (event, source, line, col, err) => {};

// 以下类型是内置的 onerror 的类型
interface Handler {
  // 简化
  onerror: OnErrorEventHandlerNonNull;
}

interface OnErrorEventHandlerNonNull {
  (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error): any;
}

// 参数类型自动推导
type CustomHandler = (name: string, age: number) => boolean;
const handler: CustomHandler = (arg1, arg2) => true;


// 返回值类型自动推导
declare const struct: {
  handler: CustomHandler;
};
// 不能将类型“void”分配给类型“boolean”。
struct.handler = (name, age) => {};


// 嵌套上下文推导
declare let func: (raw: number) => (input: string) => any;
// raw → number
func = (raw) => {
  // input → string
  return (input) => {};
};


// 函数类型组成的联合类型，上下文推导失效
class Foo {
  foo!: number;
}

class Bar extends Foo {
  bar!: number;
}

let f1: { (input: Foo): void } | { (input: Bar): void };
// 参数“input”隐式具有“any”类型。
f1 = (input) => {};

// 联合类型中将这两个类型再嵌套一层，自动推导
// 推导为 Bar 的原因，与协变、逆变有关
let f3:
   { (raw: number): (input: Foo) => void }
  | { (raw: number): (input: Bar) => void };

// raw → number
f3 = (raw) => {
  // input → Bar
  return (input) => {};
};