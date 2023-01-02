// 三斜线指令
// 三斜线指令就像是声明文件中的导入语句一样，它的作用就是声明当前的文件依赖的其他类型声明
// 三斜线指令必须被放置在文件的顶部才能生效

// 使用 path 的 reference 指令，其 path 属性的值为一个相对路径，指向项目内的其他声明文件
/// <reference path="declare.d.ts" />

// 使用 types 的 reference 指令，其 types 的值是一个包名，也就是你想引入的 @types/ 声明
/// <reference types="node" />

// 使用 lib 的 reference 指令类似于 types，只不过这里 lib 导入的是 TypeScript 内置的类型声明
/// <reference lib="dom" />
