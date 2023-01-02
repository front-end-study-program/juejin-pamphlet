// @ts-nocheck
// 类型检查指令
// 在前端世界的许多工具中，其实都提供了 行内注释（Inline Comments） 的能力，
// 用于支持在某一处特定代码使用特殊的配置来覆盖掉全局配置
// TypeScript 中同样提供了数个行内注释，均以 // @ts- 开头

// ts-ignore（直接禁用掉对下一行代码的类型检查）
// @ts-ignore
const name: string = 599;


// ts-expect-error（只有在下一行代码真的存在错误时才能被使用，否则它会给出一个错误）
// @ts-expect-error
const name1: string = 599;

// @ts-expect-error
const age: number = 599;


// ts-nocheck（TS/JS 文件将不再接受类型检查, 必须在文件顶部才有效）
const name2: string = 599;
const age3: number = 'linbudu';


// ts-check（TS/JS 文件接受类型检查, 必须在文件顶部才有效）
// 如 type-in-js 在 js 文件中开启 ts 类型检查
// JavaScript 文件
// let myAge = 18;

// 使用 JSDoc 标注变量类型
/** @type {string} */
// let myName;

// class Foo {
//   prop = 599;
// }
