// 函数的类型签名就是对其入参与出参的类型进行定义

// 函数声明类型定义
function foo(name: string): number {
  return name.length;
}


// 函数表达式类型声明
const foo1 = function (name: string): number {
  return name.length
}
// 也可以像变量声明一般声明
const foo2: (name: string) => number = function (name) {
  return name.length
}


// 箭头函数类型声明
const foo3 = (name: string): number => {
  return name.length
}
// 一般不推荐这样声明类型，可读性较差
const foo4: (name: string) => number = (name) => {
  return name.length
}
// 通过类型别名进行声明
type FuncFoo = (name: string) => number
const foo5: FuncFoo = (name) => {
  return name.length
}
// 获取通过 interface 接口来声明
interface FuncFooStruct {
  (name: string): number
}