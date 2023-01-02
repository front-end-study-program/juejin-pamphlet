// 类型声明 declare 语法

declare var f1: () => void;

declare interface Foo {
  prop: string;
}

declare function foo(input: Foo): Foo;

declare class Foo {}

// 可以直接访问这些声明
declare let otherProp: Foo['prop'];


// 不能为这些声明变量赋值
// × 不允许在环境上下文中使用初始值
declare let result = foo();

// √ Foo
declare let result: ReturnType<typeof foo>;


// 声明模块包的类型
declare module 'pkg' {
  const handler: () => boolean;
}
// import foo from 'pkg';
// const res = foo.handler();
// 模块包的默认导出
declare module 'pkg2' {
  const handler: () => boolean;
  export default handler;
}
// import bar from 'pkg2';
// bar();


// 为非代码文件，如图片、CSS文件、md文件等声明类型
// import raw from './note.md';
// const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);
declare module '*.md' {
  const raw: string;
  export default raw;
}


// DefinitelyTyped
// @types/ 开头的这一类 npm 包均属于 DefinitelyTyped 
// 是 TypeScript 维护的，专用于为社区存在的无类型定义的 JavaScript 库添加类型支持
// @types/node
declare module 'fs' {
  export function bump(): void;
}


// 扩展已有的类型定义
declare interface window {
  errorReporter: (err: any) => void;
}
// 隐式扩展全局对象
declare const errorReporter: (err: any) => void;

interface Window {
  userTracker: (...args: any[]) => Promise<void>;
}
